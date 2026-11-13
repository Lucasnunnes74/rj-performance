import { IconeWhatsApp } from "./IconeWhatsApp";
import type { ReactNode } from "react";
import { buildWhatsAppUrl, mensagemPadrao } from "@/lib/whatsapp";
import { BotaoLink } from "./Botao";

type Props = { children: ReactNode; variante?: "ouro" | "contorno"; className?: string; texto?: string };

export function LinkWhatsApp({ children, variante = "ouro", className, texto = mensagemPadrao }: Props) {
  return (
    <BotaoLink
      variante={variante}
      className={className}
      href={buildWhatsAppUrl(texto)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconeWhatsApp size={20} />
      {children}
    </BotaoLink>
  );
}
