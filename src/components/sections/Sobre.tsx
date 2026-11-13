import { conteudo, contato, ui } from "@/content/site";
import { MolduraFoto } from "@/components/ui/MolduraFoto";
import { Container } from "@/components/ui/Container";
import { RevelaPalavras } from "@/components/ui/RevelaPalavras";
import { Aparecer } from "@/components/ui/Aparecer";

const s = conteudo.sobre;

export function Sobre() {
  return (
    <section id="sobre" className="superficie-concreto overflow-hidden py-20 md:py-28">
      <Container className="grid items-center gap-14 md:grid-cols-[auto_1fr] md:gap-20">
        <Aparecer
          x={-24}
          className="order-2 mx-auto w-[68%] max-w-[20rem] md:order-1 md:mx-0 md:ml-4 md:w-[19rem] lg:w-[22rem]"
        >
          <MolduraFoto
            src={s.imagem.src}
            alt={s.imagem.alt}
            width={s.imagem.width}
            height={s.imagem.height}
            sizes="(min-width: 1024px) 352px, 70vw"
            espelhar
          />
        </Aparecer>
        <div className="order-1 md:order-2">
          <RevelaPalavras texto={s.titulo} className="titulo text-3xl md:text-[clamp(2.5rem,5vw,4.5rem)]" />
          <div className="mt-8 max-w-xl space-y-5 text-lg">
            {s.texto.map((t, i) => (
              <Aparecer key={t} tag="p" atraso={i * 0.12}>
                {t}
              </Aparecer>
            ))}
          </div>
          {(contato.cref || s.anosExperiencia !== null || s.formacao) && (
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-grafite pt-6">
              {contato.cref && (
                <div>
                  <dt className="text-sm text-concreto">{ui.crefRotulo}</dt>
                  <dd className="font-semibold">{contato.cref}</dd>
                </div>
              )}
              {s.anosExperiencia !== null && (
                <div>
                  <dt className="text-sm text-concreto">{ui.experienciaRotulo}</dt>
                  <dd className="font-semibold">{s.anosExperiencia}</dd>
                </div>
              )}
              {s.formacao && (
                <div>
                  <dt className="text-sm text-concreto">{ui.formacaoRotulo}</dt>
                  <dd className="font-semibold">{s.formacao}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </Container>
    </section>
  );
}
