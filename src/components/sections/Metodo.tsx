import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { conteudo } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { RevelaPalavras } from "@/components/ui/RevelaPalavras";
import { Aparecer } from "@/components/ui/Aparecer";

const m = conteudo.metodo;

/**
 * A "pista": uma linha dourada se desenha conforme a rolagem e um marcador inclinado
 * (o mesmo ângulo do itálico da marca) corre à frente dela. Vertical no celular, horizontal no desktop.
 */
export function Metodo() {
  const reduzido = useReducedMotion();
  const lista = useRef<HTMLDivElement>(null);
  const pistaH = useRef<HTMLDivElement>(null);
  const pistaV = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lista, offset: ["start 70%", "end 65%"] });
  const progresso = useTransform(scrollYProgress, (v) => (reduzido ? 1 : v));
  const marcadorX = useTransform(progresso, (v) => v * (pistaH.current?.offsetWidth ?? 0));
  const marcadorY = useTransform(progresso, (v) => v * (pistaV.current?.offsetHeight ?? 0));

  return (
    <section id="metodo" className="overflow-hidden bg-preto py-20 md:py-28">
      <Container>
        <RevelaPalavras texto={m.titulo} className="titulo text-2xl md:text-3xl" />

        <div ref={lista} className="relative mt-14 pl-8 lg:pt-10 lg:pl-0">
          {/* Pista vertical (abaixo de lg) */}
          <div
            ref={pistaV}
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 w-0.5 bg-grafite lg:hidden"
          >
            <motion.span style={{ scaleY: progresso }} className="block h-full origin-top bg-ouro" />
            {!reduzido && (
              <motion.span
                style={{ y: marcadorY }}
                className="absolute -top-0 -left-1 block h-4 w-2.5 -skew-x-[20deg] bg-ouro"
              />
            )}
          </div>
          {/* Pista horizontal (lg+) */}
          <div
            ref={pistaH}
            aria-hidden="true"
            className="absolute top-0 right-0 left-0 hidden h-0.5 bg-grafite lg:block"
          >
            <motion.span style={{ scaleX: progresso }} className="block h-full origin-left bg-ouro" />
            {!reduzido && (
              <motion.span
                style={{ x: marcadorX }}
                className="absolute -top-[7px] left-0 block h-4 w-2.5 -skew-x-[20deg] bg-ouro"
              />
            )}
          </div>

          <ol className="grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-8">
            {m.passos.map((passo, i) => (
              <Aparecer key={passo.nome} tag="li" atraso={i * 0.08}>
                <p className="display-largo text-xl text-concreto" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="titulo mt-2 text-xl text-balance">{passo.nome}</h3>
                <p className="mt-3 text-concreto">{passo.texto}</p>
              </Aparecer>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
