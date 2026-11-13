import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const tags = { div: motion.div, li: motion.li, p: motion.p } as const;

type Props = {
  children: ReactNode;
  tag?: keyof typeof tags;
  className?: string;
  atraso?: number;
  /** Deslocamento horizontal de entrada, em px (0 = só sobe). */
  x?: number;
};

/** Entrada ao rolar: opacidade + deslocamento curto, uma vez só. */
export function Aparecer({ children, tag = "div", className, atraso = 0, x = 0 }: Props) {
  const reduzido = useReducedMotion();
  const Tag = tags[tag];
  if (reduzido) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay: atraso, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
