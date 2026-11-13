// PostToolUse (Edit|Write|MultiEdit): confere regras da marca e do projeto no arquivo recém-editado.
// Exit 2 = a edição já aconteceu, mas a mensagem volta para o Claude corrigir na hora.
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { readInput, touchedFile, relPath, projectDir } from "./_lib.mjs";

const input = readInput();
const rel = relPath(touchedFile(input));
if (!rel.startsWith("src/") || !/\.(tsx?|css)$/.test(rel)) process.exit(0);

const abs = path.join(projectDir, rel);
if (!existsSync(abs)) process.exit(0);
const code = readFileSync(abs, "utf8");
const problems = [];

// 1) Cor fora dos tokens
if (rel !== "src/styles/tokens.css") {
  // só pega hex de cor (3, 4, 6 ou 8 dígitos) que não seja âncora de link (href="#...")
  const hex = [...code.matchAll(/(?<!href=["'{`])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g)].map((m) => m[0]);
  if (hex?.length) problems.push(`cores hex soltas (${[...new Set(hex)].slice(0, 5).join(", ")}): use os tokens de src/styles/tokens.css (ex.: text-ouro, bg-carbono).`);
  if (/\b(bg|text|border|from|via|to|fill|stroke)-\[(#|rgb|hsl)/.test(code)) problems.push("classe Tailwind com cor arbitrária ([#...]): use as cores do tema.");
}

// 2) WhatsApp montado fora da lib
if (rel !== "src/lib/whatsapp.ts" && /wa\.me|api\.whatsapp\.com/.test(code)) {
  problems.push("link do WhatsApp montado à mão: use buildWhatsAppUrl() de src/lib/whatsapp.ts.");
}

// 3) Imagem sem alt (TSX)
if (rel.endsWith(".tsx")) {
  const imgs = code.match(/<img\b[^>]*>/gs) || [];
  const semAlt = imgs.filter((t) => !/\balt=/.test(t));
  if (semAlt.length) problems.push(`${semAlt.length} <img> sem alt: descreva a foto (ex.: "Rosinaldo de braços cruzados com a camiseta RJ Performance") ou use alt="" se for decorativa.`);
  const semDim = imgs.filter((t) => !/\bwidth=/.test(t) || !/\bheight=/.test(t));
  if (semDim.length) problems.push(`${semDim.length} <img> sem width/height: informe as dimensões para evitar layout shift.`);
}

// 4) Promessas proibidas no texto
if (rel.startsWith("src/content/")) {
  const proibidas = code.match(/resultado garantido|garantimos|garantia de resultado|perca \d+ ?kg|em \d+ dias você/gi);
  if (proibidas) problems.push(`texto com promessa de resultado (${[...new Set(proibidas)].join(", ")}): reescreva sem garantir resultado (ética CONFEF).`);
}

if (problems.length) {
  process.stderr.write(`brand-guard em ${rel}:\n- ${problems.join("\n- ")}\n`);
  process.exit(2);
}
process.exit(0);
