import type { InputHTMLAttributes } from "react";

type Props = { rotulo: string; tipo: "radio" | "checkbox" } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

/** Chip acessível: input real escondido + rótulo estilizado. */
export function Chip({ rotulo, tipo, className = "", ...rest }: Props) {
  return (
    <label className={`relative cursor-pointer ${className}`}>
      <input type={tipo} className="peer sr-only" {...rest} />
      <span className="block min-h-11 rounded-chip border border-grafite px-5 py-2.5 text-giz transition-colors duration-[180ms] select-none active:scale-[0.97] peer-checked:border-ouro peer-checked:bg-ouro peer-checked:font-semibold peer-checked:text-preto peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ouro hover:border-concreto peer-checked:hover:border-ouro">
        {rotulo}
      </span>
    </label>
  );
}
