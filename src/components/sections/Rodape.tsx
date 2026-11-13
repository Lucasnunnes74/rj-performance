import { conteudo, contato, lema, ui } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { LinhaOuro } from "@/components/ui/LinhaOuro";

const r = conteudo.rodape;
const link = "inline-flex min-h-11 items-center hover:text-ouro";

export function Rodape() {
  return (
    <footer className="bg-preto pt-16 pb-28 md:pb-12">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          <img
            src="/brand/rj-logo-arte-completa-630.webp"
            alt={ui.logoAlt}
            width={315}
            height={315}
            loading="lazy"
            className="h-auto w-48 border border-grafite md:w-56"
          />
          <p
            className="lema flex flex-col items-center gap-1 text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4"
            aria-label={lema.join(" • ")}
          >
            {lema.map((p, i) => (
              <span key={p} aria-hidden="true" className="flex items-center gap-4 whitespace-nowrap">
                {p}
                {i < lema.length - 1 && <span className="hidden text-ouro sm:inline">•</span>}
              </span>
            ))}
          </p>
          <div className="flex w-full max-w-md items-center gap-4" aria-hidden="true">
            <LinhaOuro className="flex-1" />
            <svg viewBox="0 0 12 12" width="12" height="12" className="shrink-0 fill-ouro">
              <path d="M4.5 0h3v4.5H12v3H7.5V12h-3V7.5H0v-3h4.5z" />
            </svg>
            <LinhaOuro className="flex-1" />
          </div>
          <ul className="flex flex-col items-center text-concreto">
            <li>
              <a className={link} href={buildWhatsAppUrl()}>
                {contato.whatsappExibicao}
              </a>
            </li>
            <li>
              <a className={link} href={contato.instagram} target="_blank" rel="noopener noreferrer">
                @rjperformance.oficial
              </a>
            </li>
            <li className="flex min-h-11 items-center">{contato.cidade}</li>
            {contato.cref && (
              <li className="flex min-h-11 items-center">
                {ui.crefRotulo} {contato.cref}
              </li>
            )}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-grafite pt-6 text-center text-sm text-concreto">
          <p>{r.texto}</p>
          <p>
            © {new Date().getFullYear()} {r.direitos} {r.creditos}
          </p>
        </div>
      </Container>
    </footer>
  );
}
