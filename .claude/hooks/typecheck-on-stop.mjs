// Stop: antes do Claude encerrar a resposta, roda o typecheck. Se houver erro de tipo,
// devolve os erros (exit 2) para ele corrigir antes de parar.
// Proteção contra loop: se já está continuando por causa deste hook, deixa parar.
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { readInput, projectDir } from "./_lib.mjs";

const input = readInput();
if (input.stop_hook_active) process.exit(0);
if (!existsSync(path.join(projectDir, "node_modules", "typescript"))) process.exit(0);

const r = spawnSync("npx", ["--no-install", "tsc", "-b", "--pretty", "false"], {
  cwd: projectDir,
  encoding: "utf8",
  shell: process.platform === "win32",
  timeout: 100_000,
});

if (r.status && r.status !== 0) {
  const out = `${r.stdout || ""}${r.stderr || ""}`.trim().split("\n").slice(0, 40).join("\n");
  process.stderr.write(`Typecheck falhou. Corrija antes de encerrar:\n${out}\n`);
  process.exit(2);
}
process.exit(0);
