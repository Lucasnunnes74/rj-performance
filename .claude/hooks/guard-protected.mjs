// PreToolUse (Edit|Write|MultiEdit): bloqueia alterações em arquivos que não devem ser mexidos.
// Exit 2 = bloqueia a ação e devolve a mensagem para o Claude.
import { readInput, touchedFile, relPath } from "./_lib.mjs";

const input = readInput();
const rel = relPath(touchedFile(input));

const rules = [
  { test: /^assets-originais\//, why: "fotos originais do cliente são só leitura. Gere versões novas em public/images com a skill image-pipeline." },
  { test: /^public\/brand\//, why: "a logo da RJ Performance não pode ser alterada. Crie variações em public/images se precisar." },
  { test: /(^|\/)\.env(\.|$)/, why: "arquivos .env guardam segredos (ex.: token do Instagram). Edite manualmente." },
  { test: /^package-lock\.json$/, why: "o lockfile é gerado pelo npm. Use npm install." },
];

const hit = rules.find((r) => r.test.test(rel));
if (hit) {
  process.stderr.write(`Bloqueado: ${rel} — ${hit.why}\n`);
  process.exit(2);
}
process.exit(0);
