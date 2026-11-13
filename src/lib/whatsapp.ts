// Único lugar do projeto que monta links do WhatsApp (regra verificada pelo hook brand-guard).
import { contato } from "@/content/site";

export type PedidoWhatsApp = {
  nome: string;
  whatsapp: string; // só dígitos, com DDD
  objetivo: string;
  momento: string;
  modalidade?: string;
  horarios: string[];
  mensagem?: string;
};

/** Link wa.me com texto opcional. Sem texto, abre só a conversa. */
export function buildWhatsAppUrl(texto?: string): string {
  const base = `https://wa.me/${contato.whatsappE164}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

/** Formata 11912345678 → (11) 91234-5678 */
export function formatarTelefone(digitos: string): string {
  const d = digitos.replace(/\D/g, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return digitos;
}

/** Mensagem que chega para o Rosinaldo a partir do formulário em etapas. */
export function montarMensagem(p: PedidoWhatsApp): string {
  const linhas = [
    "Olá, Rosinaldo! Vim pelo site da RJ Performance.",
    "",
    `*Nome:* ${p.nome.trim()}`,
    `*WhatsApp:* ${formatarTelefone(p.whatsapp)}`,
    `*Objetivo:* ${p.objetivo}`,
    `*Momento:* ${p.momento}${p.modalidade ? ` (${p.modalidade.trim()})` : ""}`,
    `*Horários:* ${p.horarios.join(", ")}`,
  ];
  if (p.mensagem?.trim()) linhas.push(`*Dúvida:* ${p.mensagem.trim()}`);
  linhas.push("", "Quero agendar minha avaliação.");
  return linhas.join("\n");
}

/** Mensagem curta para os CTAs simples e o botão flutuante. */
export const mensagemPadrao =
  "Olá, Rosinaldo! Vim pelo site da RJ Performance e quero saber mais sobre os treinos.";

/** Máscara de digitação: 11912345678 → (11) 91234-5678 (aceita fixo de 10 dígitos). */
export function mascararTelefone(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
