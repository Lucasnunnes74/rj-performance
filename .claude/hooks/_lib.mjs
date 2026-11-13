// Utilidades compartilhadas pelos hooks. Node puro, sem dependências (funciona em Windows, macOS e Linux).
import { readFileSync } from "node:fs";
import path from "node:path";

export function readInput() {
  try {
    const raw = readFileSync(0, "utf8");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();

/** Caminho do arquivo relativo à raiz do projeto, sempre com "/" */
export function relPath(file) {
  if (!file) return "";
  const abs = path.isAbsolute(file) ? file : path.join(projectDir, file);
  return path.relative(projectDir, abs).split(path.sep).join("/");
}

/** Lista de arquivos tocados pela ferramenta (Edit, Write, MultiEdit) */
export function touchedFile(input) {
  return input?.tool_input?.file_path || input?.tool_input?.path || "";
}
