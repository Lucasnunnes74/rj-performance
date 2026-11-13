import { motion, useReducedMotion } from "motion/react";
import { conteudo } from "@/content/site";
import { buildWhatsAppUrl, mensagemPadrao } from "@/lib/whatsapp";
import { BotaoLink } from "@/components/ui/Botao";
import { MolduraFoto } from "@/components/ui/MolduraFoto";
import { Magnetico } from "@/components/ui/Magnetico";
import { IconeWhatsApp } from "@/components/ui/IconeWhatsApp";
import { LinhaOuro } from "@/components/ui/LinhaOuro";
import { Container } from "@/components/ui/Container";

const h = conteudo.hero;
const ease = [0.16, 1, 0.3, 1] as const;
const rastros = ["w-full", "w-2/3", "w-5/6"] as const;

/**
 * Linha 1: a palavra PERFORMANCE, gigante e vazada, na largura toda (cqw = nunca vaza).
 * Linha 2: texto à esquerda, foto original inteira numa moldura angular à direita.
 * Nada se sobrepõe: o movimento vem da máscara de entrada, dos rastros e do parallax da foto.
 */
export function Hero() {
  const reduzido = useReducedMotion();
  const sobe = (delay: number, duration = 0.5) =>
    reduzido
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.15 } }
      : {
          initial: { y: 24, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration, delay, ease },
        };
  const palavra = (delay: number) =>
    reduzido
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.15 } }
      : { initial: { y: "105%" }, animate: { y: 0 }, transition: { duration: 0.8, delay, ease } };

  return (
    <section id="inicio" className="relative overflow-hidden bg-preto pt-16">
      <Container className="flex flex-col py-10 lg:min-h-[calc(100svh-4rem)] lg:justify-center lg:py-14">
        {/* PERFORMANCE */}
        <div aria-hidden="true" className="@container">
          <p className="display-largo contorno-ouro text-[17cqw] select-none sm:text-[9.1cqw]">
            <span className="block overflow-hidden pr-[0.1em] -mr-[0.1em] sm:inline-block">
              <motion.span {...palavra(0.1)} className="block">
                Perfor
              </motion.span>
            </span>
            <span className="block overflow-hidden pr-[0.1em] -mr-[0.1em] sm:inline-block">
              <motion.span {...palavra(0.22)} className="block">
                mance
              </motion.span>
            </span>
          </p>
          <motion.div
            initial={reduzido ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            style={{ transformOrigin: "left" }}
            className="mt-4"
          >
            <LinhaOuro />
          </motion.div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
          {/* Foto: em telas pequenas vem primeiro, à direita, com os rastros no espaço livre à esquerda */}
          <motion.div
            {...sobe(0.55, 0.7)}
            className="relative mx-auto w-[64%] lg:ml-auto lg:mr-4 max-w-[18rem] sm:max-w-[22rem] lg:order-2 lg:mr-5 lg:w-[22rem]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-full mr-4 hidden w-14 -translate-y-1/2 flex-col items-end gap-2.5 sm:w-20 lg:flex lg:w-14 xl:w-20"
            >
              {rastros.map((w, i) => (
                <motion.span
                  key={w}
                  initial={reduzido ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease }}
                  style={{ transformOrigin: "right" }}
                  className={`block h-px bg-ouro/50 ${w}`}
                />
              ))}
            </div>
            <MolduraFoto
              src={h.imagem.src}
              alt={h.imagem.alt}
              width={h.imagem.width}
              height={h.imagem.height}
              prioridade
              sizes="(min-width: 1024px) 352px, 70vw"
            />
          </motion.div>

          {/* Texto */}
          <motion.div {...sobe(0.45, 0.5)} className="lg:order-1">
            <h1 className="titulo max-w-[22ch] text-2xl text-balance lg:text-[clamp(2rem,3.2vw,3rem)]">
              {h.titulo}
            </h1>
            <p className="mt-4 text-concreto">{h.subtitulo}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
              <Magnetico>
                <BotaoLink
                  href={buildWhatsAppUrl(mensagemPadrao)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 leading-tight sm:whitespace-nowrap"
                >
                  <IconeWhatsApp size={20} />
                  {h.ctaPrincipal}
                </BotaoLink>
              </Magnetico>
              <a
                href="#no-treino"
                className="inline-flex min-h-11 items-center justify-center py-2 text-center text-giz underline decoration-ouro decoration-2 underline-offset-8 hover:text-ouro sm:whitespace-nowrap"
              >
                {h.ctaSecundario}
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
