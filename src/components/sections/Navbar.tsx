import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { contato, navegacao, ui } from "@/content/site";
import { LinkWhatsApp } from "@/components/ui/LinkWhatsApp";
import { Container } from "@/components/ui/Container";

const ids = navegacao.map((l) => l.href.slice(1));

export function Navbar() {
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [ativo, setAtivo] = useState<string | null>(null);
  const [aberto, setAberto] = useState(false);

  // Destaca no menu a seção que está no meio da tela
  useEffect(() => {
    const secoes = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => e !== null);
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtivo(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secoes.forEach((s) => io.observe(s));
    const topo = () => window.scrollY < 200 && setAtivo(null);
    window.addEventListener("scroll", topo, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", topo);
    };
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-grafite/60 bg-preto/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#inicio" aria-label={contato.marca} className="block shrink-0 py-2">
          <img
            src="/brand/rj-monograma-200.webp"
            srcSet="/brand/rj-monograma-200.webp 1x, /brand/rj-monograma-400.webp 2x"
            alt={contato.marca}
            width={200}
            height={161}
            className="h-12 w-auto"
          />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {navegacao.map((l) => {
            const atual = ativo === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={atual ? "location" : undefined}
                className={`relative py-3 transition-colors hover:text-ouro ${atual ? "text-ouro" : "text-giz"}`}
              >
                {l.rotulo}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-1.5 h-0.5 origin-left bg-ouro transition-transform duration-[320ms] ease-arrancada ${
                    atual ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LinkWhatsApp className="min-h-11 px-4 py-2 text-sm">{ui.navCta}</LinkWhatsApp>
          <button
            type="button"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? ui.fecharMenu : ui.abrirMenu}
            onClick={() => setAberto((v) => !v)}
            className="grid size-11 place-items-center rounded-painel border border-grafite text-giz hover:border-ouro hover:text-ouro lg:hidden"
          >
            {aberto ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </Container>

      {aberto && (
        <nav
          id="menu-mobile"
          aria-label="Principal"
          className="border-t border-grafite/60 bg-preto lg:hidden"
        >
          <Container>
            <ul className="py-2">
              {navegacao.map((l) => {
                const atual = ativo === l.href.slice(1);
                return (
                  <li key={l.href} className="border-b border-grafite/60 last:border-b-0">
                    <a
                      href={l.href}
                      onClick={() => setAberto(false)}
                      aria-current={atual ? "location" : undefined}
                      className={`flex min-h-12 items-center justify-between titulo text-lg ${atual ? "text-ouro" : "text-giz"}`}
                    >
                      {l.rotulo}
                      {atual && <span aria-hidden="true" className="size-1.5 rounded-full bg-ouro" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Container>
        </nav>
      )}

      {/* Progresso da página: a linha dourada da marca, desenhada pela rolagem */}
      {!reduzido && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="linha-ouro absolute inset-x-0 -bottom-px origin-left"
        />
      )}
    </header>
  );
}
