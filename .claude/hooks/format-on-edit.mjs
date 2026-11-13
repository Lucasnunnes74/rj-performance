// PostToolUse (Edit|Write|MultiEdit): roda Prettier e o linter (oxlint, padrão do Vite atual,
// ou ESLint, se o projeto usar) com --fix no arquivo editado.
// Silencioso: nunca bloqueia, só formata. Se as ferramentas não estiverem instaladas, não faz nada.
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { readInput, touchedFile, relPath, projectDir } from "./_lib.mjs";

const input = readInput();
const rel = relPath(touchedFile(input));
if (!rel || rel.startsWith("..") || rel.startsWith(".claude/")) process.exit(0);
if (!/\.(tsx?|jsx?|css|json|md|html)$/.test(rel)) process.exit(0);

const has = (name) => ["", ".cmd"].some((ext) => existsSync(path.join(projectDir, "node_modules", ".bin", name + ext)));
const run = (args) => spawnSync("npx", ["--no-install", ...args], { cwd: projectDir, stdio: "ignore", shell: process.platform === "win32" });

if (has("prettier")) run(["prettier", "--write", rel]);
if (/\.(tsx?|jsx?)$/.test(rel)) {
  if (has("oxlint")) run(["oxlint", "--fix", rel]);
  else if (has("eslint")) run(["eslint", "--fix", rel]);
}
process.exit(0);
