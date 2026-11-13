import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { conteudo, ui } from "@/content/site";
import { usePerfil, type Perfil } from "@/lib/perfil";
import { MolduraFoto } from "@/components/ui/MolduraFoto";
import { RevelaPalavras } from "@/components/ui/RevelaPalavras";
import { Container } from "@/components/ui/Container";
import { BotaoLink } from "@/components/ui/Botao";

const p = conteudo.paraQuem;
const chaves: Perfil[] = ["atleta", "geral"];
const alts: Record<Perfil, string> = { atleta: ui.imagens.costas, geral: ui.imagens.sorrindo };
const dims: Record<Perfil, [number, number]> = { atleta: [1200, 1600], geral: [1200, 1500] };

export function ParaQuem() {
  const { perfil, setPerfil } = usePerfil();
  const reduzido = useReducedMotion();
  const atual: Perfil = perfil ?? "atleta";
  const op = p.opcoes[atual];

  return (
    <section id="para-quem" className="superficie-concreto overflow-hidden py-20 md:py-28">
      <Container>
        <RevelaPalavras texto={p.titulo} className="titulo max-w-3xl text-2xl md:text-3xl" />
        <div
          role="tablist"
          aria-label={p.titulo}
          className="mt-8 inline-flex rounded-chip border border-grafite bg-preto p-1"
        >
          {chaves.map((k) => (
            <button
              key={k}
              role="tab"
              id={`tab-${k}`}
              type="button"
              aria-selected={atual === k}
              aria-controls="painel-perfil"
              onClick={() => setPerfil(k)}
              className={`min-h-11 rounded-chip px-5 font-semibold transition-colors duration-[180ms] ${
                atual === k ? "bg-ouro text-preto" : "text-giz hover:text-ouro"
              }`}
            >
              {p.opcoes[k].rotulo}
            </button>
          ))}
        </div>

        <div id="painel-perfil" role="tabpanel" aria-labelledby={`tab-${atual}`} className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={atual}
              initial={{ opacity: 0, y: reduzido ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduzido ? 0.15 : 0.2 }}
              className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]"
            >
              <div>
                <h3 className="titulo text-xl md:text-2xl">{op.titulo}</h3>
                <p className="mt-4">{op.texto}</p>
                <BotaoLink href="#contato" className="mt-8">
                  {ui.montarPedido}
                </BotaoLink>
              </div>
              <MolduraFoto
                src={op.imagem}
                alt={alts[atual]}
                width={dims[atual][0]}
                height={dims[atual][1]}
                sizes="(min-width: 768px) 22rem, 70vw"
                traco="concreto"
                className="mx-auto w-[68%] max-w-[20rem] md:ml-auto md:mr-4 md:w-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
