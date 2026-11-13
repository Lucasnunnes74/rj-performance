import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { conteudo, ui } from "@/content/site";
import { perfilInstagram, urlEmbed } from "@/content/instagram";
import { useReelsInstagram } from "@/lib/useReelsInstagram";
import { Container } from "@/components/ui/Container";
import { BotaoLink } from "@/components/ui/Botao";
import { RevelaPalavras } from "@/components/ui/RevelaPalavras";

const n = conteudo.noTreino;

const seta =
  "grid size-12 place-items-center rounded-full border border-grafite text-giz transition-colors duration-[180ms] hover:border-ouro hover:text-ouro disabled:opacity-30 disabled:hover:border-grafite disabled:hover:text-giz";

/**
 * Carrossel de reels, só o vídeo: o player oficial do Instagram é recortado (sem cabeçalho nem rodapé).
 * Celular: reel atual no centro com vizinhos esmaecidos. Desktop: texto à esquerda e o trilho
 * começa na coluna da direita, sangrando até a borda da tela.
 * Largura do slide = 18.5rem, espaço = 1.25rem (passo 19.75rem); mantenha igual nas classes.
 */
export function NoTreino() {
  const posts = useReelsInstagram();
  const [ativo, setAtivo] = useState(0);
  const inicioX = useRef<number | null>(null);
  const total = posts.length;
  const ir = (i: number) => setAtivo(Math.max(0, Math.min(total - 1, i)));

  const aoTeclar = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") ir(ativo - 1);
    if (e.key === "ArrowRight") ir(ativo + 1);
  };
  const aoSoltar = (e: PointerEvent) => {
    if (inicioX.current === null) return;
    const dx = e.clientX - inicioX.current;
    inicioX.current = null;
    if (Math.abs(dx) > 50) ir(ativo + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      id="no-treino"
      className={`overflow-hidden bg-preto ${total > 0 ? "py-20 md:py-28" : "border-y border-grafite py-14 md:py-16"}`}
    >
      <Container>
        <div className="lg:grid lg:grid-cols-[22rem_minmax(0,1fr)] lg:grid-rows-[1fr_auto] lg:gap-x-16">
          <div className="flex flex-col items-start gap-6 lg:col-start-1 lg:row-start-1 lg:self-end">
            <div>
              <RevelaPalavras texto={n.titulo} className="titulo text-2xl md:text-3xl" />
              <p className="mt-4 text-concreto">{n.texto}</p>
            </div>
            <BotaoLink
              variante="contorno"
              href={perfilInstagram.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {n.cta}
            </BotaoLink>
          </div>

          {total > 0 && (
            <>
              <div
                role="group"
                aria-roledescription="carrossel"
                aria-label={ui.carrossel}
                tabIndex={0}
                onKeyDown={aoTeclar}
                onPointerDown={(e) => (inicioX.current = e.clientX)}
                onPointerUp={aoSoltar}
                onPointerCancel={() => (inicioX.current = null)}
                className="relative -mx-5 mt-10 h-[34rem] overflow-hidden outline-offset-4 md:-mx-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:mt-0 lg:-mr-[max(2rem,calc((100vw-80rem)/2+2rem))]"
              >
                <ul
                  className="absolute top-0 left-1/2 flex h-full items-start gap-5 transition-transform duration-[420ms] ease-arrancada [transform:translateX(calc(var(--n)*-19.75rem_-_9.25rem))] lg:left-0 lg:[transform:translateX(calc(var(--n)*-19.75rem))]"
                  style={{ "--n": ativo } as CSSProperties}
                >
                  {posts.map((p, i) => {
                    const atual = i === ativo;
                    const perto = Math.abs(i - ativo) <= 2;
                    return (
                      <li
                        key={p.id}
                        aria-label={`${i + 1} / ${total}`}
                        aria-hidden={atual ? undefined : true}
                        className={`relative h-[33rem] w-[18.5rem] shrink-0 overflow-hidden rounded-painel border bg-carbono transition-[opacity,transform,border-color] duration-[420ms] ease-arrancada ${
                          atual ? "border-ouro" : "scale-[0.94] border-grafite opacity-50"
                        }`}
                      >
                        {perto ? (
                          <iframe
                            src={urlEmbed(p)}
                            title={`${ui.carrossel}: ${p.legenda}`}
                            loading="lazy"
                            scrolling="no"
                            allowFullScreen
                            tabIndex={atual ? 0 : -1}
                            className="absolute -top-[3.3rem] left-1/2 h-[calc(100%+12rem)] w-[143%] -translate-x-1/2 border-0"
                          />
                        ) : (
                          <span className="superficie-concreto grid size-full place-items-center">
                            <span className="grid size-16 place-items-center rounded-full border-2 border-ouro text-ouro">
                              <Play aria-hidden="true" size={26} fill="currentColor" />
                            </span>
                          </span>
                        )}
                        {!atual && (
                          <button
                            type="button"
                            tabIndex={-1}
                            aria-label={`${ui.irPara} ${i + 1}`}
                            onClick={() => ir(i)}
                            className="absolute inset-0 z-10"
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 lg:col-start-1 lg:row-start-2 lg:mt-8 lg:justify-start">
                <button
                  type="button"
                  aria-label={ui.anterior}
                  onClick={() => ir(ativo - 1)}
                  disabled={ativo === 0}
                  className={seta}
                >
                  <ChevronLeft aria-hidden="true" size={22} />
                </button>
                <div className="flex items-center">
                  {posts.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`${ui.irPara} ${i + 1}`}
                      aria-current={i === ativo}
                      onClick={() => ir(i)}
                      className="grid size-8 place-items-center lg:size-6"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-[320ms] ${
                          i === ativo ? "w-6 bg-ouro" : "w-1.5 bg-grafite"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label={ui.proximo}
                  onClick={() => ir(ativo + 1)}
                  disabled={ativo === total - 1}
                  className={seta}
                >
                  <ChevronRight aria-hidden="true" size={22} />
                </button>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
