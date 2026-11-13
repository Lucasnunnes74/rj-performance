// SessionStart: o que este script imprime entra no contexto da sessão.
// Carrega o status do projeto e as pendências do cliente, para cada sessão começar sabendo onde parou.
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { projectDir } from "./_lib.mjs";

const files = ["docs/STATUS.md", "docs/PENDENCIAS-CLIENTE.md"];
let out = "";
for (const f of files) {
  const p = path.join(projectDir, f);
  if (existsSync(p)) out += `\n===== ${f} =====\n${readFileSync(p, "utf8").slice(0, 4000)}\n`;
}
if (out) process.stdout.write(`Contexto do projeto RJ Performance:${out}`);
process.exit(0);
