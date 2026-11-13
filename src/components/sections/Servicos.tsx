import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { conteudo } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { RevelaPalavras } from "@/components/ui/RevelaPalavras";
import { Aparecer } from "@/components/ui/Aparecer";

const s = conteudo.servicos;

export function Servicos() {
  const [aberto, setAberto] = useState<string | null>(null);

  return (
    <section id="servicos" className="bg-preto py-20 md:py-28">
      <Container>
        <RevelaPalavras texto={s.titulo} className="titulo text-2xl md:text-3xl" />
        <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {s.grupos.map((g, gi) => (
            <Aparecer key={g.nome} atraso={gi * 0.08}>
              <h3 className="titulo border-b border-grafite pb-3 text-xl">{g.nome}</h3>
              <ul>
                {g.itens.map((item) => {
                  const ativo = aberto === item.nome;
                  const id = `serv-${item.nome.replace(/\W+/g, "-").toLowerCase()}`;
                  return (
                    <li key={item.nome} className="group relative border-b border-grafite">
                      {/* Linha dourada que desliza por baixo no hover (desktop) ou ao abrir (celular) */}
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-[-1px] left-0 h-0.5 w-full origin-left bg-ouro transition-transform duration-[420ms] ease-arrancada md:group-hover:scale-x-100 ${
                          ativo ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                      <button
                        type="button"
                        aria-expanded={ativo}
                        aria-controls={id}
                        onClick={() => setAberto(ativo ? null : item.nome)}
                        className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-semibold transition-transform duration-[320ms] ease-arrancada md:pointer-events-none md:group-hover:translate-x-2"
                      >
                        {item.nome}
                        <ChevronDown
                          aria-hidden="true"
                          size={20}
                          className={`shrink-0 text-ouro transition-transform duration-[320ms] md:hidden ${ativo ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        id={id}
                        className={`grid transition-[grid-template-rows] duration-[320ms] ease-arrancada md:grid-rows-[1fr] ${
                          ativo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-5 text-concreto transition-transform duration-[320ms] ease-arrancada md:group-hover:translate-x-2">
                            {item.descricao}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Aparecer>
          ))}
        </div>
      </Container>
    </section>
  );
}
