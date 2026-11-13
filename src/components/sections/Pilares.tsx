import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { conteudo } from "@/content/site";
import { MolduraFoto } from "@/components/ui/MolduraFoto";
import { Container } from "@/components/ui/Container";
import { RevelaPalavras } from "@/components/ui/RevelaPalavras";
import { Aparecer } from "@/components/ui/Aparecer";

const p = conteudo.pilares;
const costas = conteudo.paraQuem.opcoes.atleta.imagem;

export function Pilares() {
  const reduzido = useReducedMotion();
  const lista = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lista, offset: ["start 75%", "end 60%"] });
  const progresso = useTransform(scrollYProgress, (v) => (reduzido ? 1 : v));

  return (
    <section id="pilares" className="overflow-hidden bg-preto py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div>
          <RevelaPalavras texto={p.titulo} className="titulo text-2xl md:text-3xl" />
          {/* A linha dourada enche conforme você rola pelos três pilares */}
          <div ref={lista} className="relative mt-10 pl-8 md:pl-10">
            <div aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-0.5 bg-grafite">
              <motion.span style={{ scaleY: progresso }} className="block h-full origin-top bg-ouro" />
            </div>
            <ul className="space-y-10">
              {p.itens.map((item, i) => (
                <Aparecer key={item.nome} tag="li" atraso={i * 0.05} x={-16}>
                  <h3 className="titulo text-xl md:text-2xl">{item.nome}</h3>
                  <p className="mt-3 text-concreto">{item.texto}</p>
                </Aparecer>
              ))}
            </ul>
          </div>
        </div>
        <div className="hidden lg:block">
          <MolduraFoto
            src={costas}
            alt=""
            aria-hidden="true"
            width={1200}
            height={1600}
            sizes="22rem"
            traco="concreto"
            className="mx-auto w-full max-w-[22rem] lg:mr-4 lg:ml-auto"
          />
        </div>
      </Container>
    </section>
  );
}
