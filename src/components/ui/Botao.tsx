import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "ouro" | "contorno";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-painel px-6 py-3 text-center font-semibold transition-colors duration-[180ms] disabled:opacity-50";
const variantes: Record<Variante, string> = {
  // Brilho que atravessa o botão no hover: só transform, sem sombra.
  ouro: "relative overflow-hidden bg-ouro text-preto hover:bg-ouro-claro before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:-skew-x-[20deg] before:bg-giz/30 before:transition-transform before:duration-700 before:ease-arrancada hover:before:translate-x-[520%] motion-reduce:before:hidden",
  contorno: "border border-ouro text-ouro hover:bg-ouro hover:text-preto",
};

type BotaoProps = { variante?: Variante; children: ReactNode; className?: string };

export function Botao({
  variante = "ouro",
  className = "",
  children,
  ...rest
}: BotaoProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`${base} ${variantes[variante]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function BotaoLink({
  variante = "ouro",
  className = "",
  children,
  ...rest
}: BotaoProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variantes[variante]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
