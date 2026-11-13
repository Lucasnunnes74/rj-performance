import { conteudo } from "@/content/site";
import { Container } from "@/components/ui/Container";

const d = conteudo.depoimentos;

/** Só aparece quando houver depoimentos reais e autorizados. */
export function Depoimentos() {
  if (d.itens.length === 0) return null;
  return (
    <section id="depoimentos" className="bg-preto py-20 md:py-28">
      <Container>
        <h2 className="titulo text-2xl md:text-3xl">{d.titulo}</h2>
        <ul className="mt-10 grid gap-10 md:grid-cols-2">
          {d.itens.map((i) => (
            <li key={i.nome} className="border-l-2 border-ouro pl-6">
              <blockquote>{i.texto}</blockquote>
              <p className="mt-3 font-semibold">
                {i.nome}
                {i.contexto && <span className="font-normal text-concreto"> · {i.contexto}</span>}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
