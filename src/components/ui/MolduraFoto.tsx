import { useRef, type ComponentProps } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Foto } from "./Foto";

type Props = Omit<ComponentProps<typeof Foto>, "className" | "style"> & {
  /** Classes do contêiner (largura, margens). A foto sempre aparece inteira, na proporção original. */
  className?: string;
  /** Espelha os cortes angulares e o deslocamento da moldura. */
  espelhar?: boolean;
  /** Cor do traço da moldura deslocada. */
  traco?: "ouro" | "concreto";
};

const cortes = {
  normal: "polygon(0 0, 86% 0, 100% 9%, 100% 100%, 14% 100%, 0 91%)",
  espelhado: "polygon(14% 0, 100% 0, 100% 91%, 86% 100%, 0 100%, 0 9%)",
};
const pontos = {
  normal: "0,0 86,0 100,9 100,100 14,100 0,91",
  espelhado: "14,0 100,0 100,91 86,100 0,100 0,9",
};

/**
 * Foto original inteira, com os cantos cortados em diagonal (como o itálico da marca)
 * e uma moldura em traço fino deslocada atrás. Sem sombra, sem brilho, sem máscara de fade.
 * Ao rolar, foto e moldura andam em velocidades diferentes (parallax só de transform).
 */
export function MolduraFoto({ className = "", espelhar = false, traco = "ouro", ...foto }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yFoto = useTransform(scrollYProgress, [0, 1], reduzido ? [0, 0] : [22, -22]);
  const yMoldura = useTransform(scrollYProgress, [0, 1], reduzido ? [0, 0] : [-12, 12]);
  const v = espelhar ? "espelhado" : "normal";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ y: yMoldura }}
        className={`pointer-events-none absolute top-4 h-full w-full ${espelhar ? "-left-4" : "left-4"} ${
          traco === "ouro" ? "text-ouro/70" : "text-concreto/60"
        }`}
      >
        <polygon
          points={pontos[v]}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </motion.svg>
      <motion.div style={{ y: yFoto }} className="relative">
        <Foto {...foto} className="block h-auto w-full" style={{ clipPath: cortes[v] }} />
      </motion.div>
    </div>
  );
}
