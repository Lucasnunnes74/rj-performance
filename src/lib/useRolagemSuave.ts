import { useEffect } from "react";

/**
 * Rolagem suave para qualquer link interno (#secao), em todos os navegadores.
 * Não depende do CSS scroll-behavior (que alguns aparelhos desligam). O deslocamento
 * da barra fixa vem do scroll-padding-top do html.
 */
export function useRolagemSuave() {
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute("href")!.slice(1));
      const alvo = id ? document.getElementById(id) : document.documentElement;
      if (!alvo) return;
      e.preventDefault();
      if (id) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", id ? `#${id}` : location.pathname);
    };
    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, []);
}
