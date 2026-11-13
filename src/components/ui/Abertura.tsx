import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { contato, lema } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Abertura minimalista: o nome surge em letras espaçadas, uma linha dourada se desenha,
 * o lema aparece e a tela some em fade revelando o site. A cada carregamento da página.
 */
export function Abertura({ onSaida }: { onSaida: () => void }) {
  const reduzido = useReducedMotion();

  useEffect(() => {
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(onSaida, reduzido ? 500 : 2400);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = anterior;
    };
  }, [onSaida, reduzido]);

  const t = (delay: number, duration = 0.8) => (reduzido ? { duration: 0.2 } : { duration, delay, ease });

  return (
    <motion.div
      role="presentation"
      className="fixed inset-0 z-[100] grid place-items-center bg-preto"
      initial={false}
      exit={{ opacity: 0 }}
      transition={{ duration: reduzido ? 0.2 : 0.8, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center px-6 text-center">
        <motion.p
          className="titulo text-base tracking-[0.28em] text-giz uppercase sm:text-xl sm:tracking-[0.45em]"
          initial={{ opacity: 0, y: reduzido ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.2)}
        >
          {contato.marca}
        </motion.p>
        <motion.div
          aria-hidden="true"
          className="linha-ouro mt-5 w-16 origin-center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={t(0.8, 0.6)}
        />
        <motion.p
          className="lema mt-5 text-[0.65rem] text-concreto sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={t(1.2, 0.7)}
        >
          {lema.join(" • ")}
        </motion.p>
      </div>
    </motion.div>
  );
}
