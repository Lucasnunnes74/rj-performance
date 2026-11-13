import { Fragment, type ElementType } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type Props = { texto: string; as?: ElementType; className?: string; atraso?: number };

const ease = [0.16, 1, 0.3, 1] as const;
const palavra: Variants = {
  oculto: { y: "115%" },
  visivel: { y: 0, transition: { duration: 0.65, ease } },
};

/**
 * Título que se revela por máscara: cada palavra sobe de dentro de uma "janela".
 * O gatilho (whileInView) fica no contêiner, não na palavra: dentro de overflow:hidden
 * a palavra escondida nunca "entraria" na tela. Só transform; sem movimento se o usuário pedir.
 */
export function RevelaPalavras({ texto, as: Tag = "h2", className = "", atraso = 0 }: Props) {
  const reduzido = useReducedMotion();
  if (reduzido) return <Tag className={className}>{texto}</Tag>;
  const palavras = texto.split(" ");
  return (
    <motion.div
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ delayChildren: atraso, staggerChildren: 0.05 }}
    >
      <Tag className={className} aria-label={texto}>
        {palavras.map((p, i) => (
          <Fragment key={`${p}-${i}`}>
            <span
              aria-hidden="true"
              className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-top"
            >
              <motion.span className="inline-block" variants={palavra}>
                {p}
              </motion.span>
            </span>
            {i < palavras.length - 1 ? " " : null}
          </Fragment>
        ))}
      </Tag>
    </motion.div>
  );
}
