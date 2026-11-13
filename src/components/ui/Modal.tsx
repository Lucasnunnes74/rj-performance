import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { ui } from "@/content/site";

type Props = { aberto: boolean; onFechar: () => void; titulo: string; children: ReactNode };

/** Modal nativo (<dialog>): trap de foco, Esc e retorno do foco ao gatilho vêm do navegador. */
export function Modal({ aberto, onFechar, titulo, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (aberto && !d.open) d.showModal();
    if (!aberto && d.open) d.close();
  }, [aberto]);

  return (
    <dialog
      ref={ref}
      aria-label={titulo}
      onClose={onFechar}
      onClick={(e) => e.target === ref.current && onFechar()}
      className="m-auto w-[min(92vw,30rem)] rounded-painel border border-grafite bg-carbono p-0 text-giz backdrop:bg-preto/85"
    >
      {aberto && (
        <div className="relative">
          <button
            type="button"
            onClick={onFechar}
            aria-label={ui.fecharModal}
            className="absolute top-2 right-2 z-10 grid size-11 place-items-center rounded-full bg-preto/80 text-giz hover:text-ouro"
          >
            <X aria-hidden="true" size={22} />
          </button>
          {children}
        </div>
      )}
    </dialog>
  );
}
