import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconeWhatsApp } from "@/components/ui/IconeWhatsApp";
import { ui } from "@/content/site";
import { buildWhatsAppUrl, mensagemPadrao } from "@/lib/whatsapp";

/** Aparece só depois que o hero sai da tela. */
export function WhatsAppFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setVisivel(!e.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.a
          href={buildWhatsAppUrl(mensagemPadrao)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ui.botaoFlutuante}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.18 }}
          className="fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-preto shadow-lg"
        >
          <IconeWhatsApp size={30} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
