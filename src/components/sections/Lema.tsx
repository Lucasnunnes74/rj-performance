import { contato, lema } from "@/content/site";

/** Duas faixas em sentidos opostos: o lema em cima, o nome da marca vazado embaixo. */
export function Lema() {
  const grupo = lema.flatMap((p, i) => [
    <span key={p} className="text-giz">
      {p}
    </span>,
    <span key={`s${i}`} aria-hidden="true" className="text-ouro">
      •
    </span>,
  ]);
  const marca = contato.marca.toUpperCase();
  return (
    <section
      aria-label={lema.join(" • ")}
      className="letreiro-pausa overflow-hidden border-y border-grafite bg-preto py-4 md:py-6"
    >
      <div aria-hidden="true" className="letreiro lema flex w-max text-base whitespace-nowrap md:text-lg">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 gap-8 pr-8">
            {[0, 1, 2].map((r) => (
              <div key={r} className="flex gap-8">
                {grupo}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="letreiro-inverso display-largo contorno-concreto mt-3 flex w-max text-5xl whitespace-nowrap select-none md:mt-5 md:text-7xl"
      >
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 gap-10 pr-10">
            {[0, 1, 2, 3].map((r) => (
              <span key={r} className="pr-[0.1em]">
                {marca}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
