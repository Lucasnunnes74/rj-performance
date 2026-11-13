import { conteudo } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { RevelaPalavras } from "@/components/ui/RevelaPalavras";

const f = conteudo.faq;

export function Faq() {
  const itens = f.itens.filter((i) => i.resposta);
  if (itens.length === 0) return null;
  return (
    <section id="faq" className="bg-preto py-20 md:py-28">
      <Container>
        <div className="mx-auto text-start">
          <RevelaPalavras
            texto={f.titulo}
            className="titulo justify-center text-center text-2xl md:text-3xl"
          />
          <div className="mt-10 border-t border-grafite">
            {itens.map((i) => (
              <details key={i.pergunta} className="group border-b border-grafite open:bg-carbono">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-center font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  {i.pergunta}
                  <span
                    aria-hidden="true"
                    className="text-xl text-ouro transition-transform duration-[180ms] group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-4 pb-5 text-concreto">{i.resposta}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
