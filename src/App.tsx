import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Abertura } from "@/components/ui/Abertura";
import { useRolagemSuave } from "@/lib/useRolagemSuave";
import { PerfilProvider } from "@/lib/perfil";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Lema } from "@/components/sections/Lema";
import { Pilares } from "@/components/sections/Pilares";
import { Sobre } from "@/components/sections/Sobre";
import { Servicos } from "@/components/sections/Servicos";
import { ParaQuem } from "@/components/sections/ParaQuem";
import { Metodo } from "@/components/sections/Metodo";
import { NoTreino } from "@/components/sections/NoTreino";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Faq } from "@/components/sections/Faq";
import { Contato } from "@/components/sections/Contato";
import { Rodape } from "@/components/sections/Rodape";
import { WhatsAppFlutuante } from "@/components/sections/WhatsAppFlutuante";

export default function App() {
  const [aberta, setAberta] = useState(true);
  useRolagemSuave();
  const fechar = useCallback(() => setAberta(false), []);

  return (
    <PerfilProvider>
      <AnimatePresence>{aberta && <Abertura onSaida={fechar} />}</AnimatePresence>
      <Navbar />
      <main>
        {!aberta && <Hero />}
        <Lema />
        <Pilares />
        <Sobre />
        <Servicos />
        <ParaQuem />
        <Metodo />
        <NoTreino />
        <Depoimentos />
        <Faq />
        <Contato />
      </main>
      <Rodape />
      {!aberta && <WhatsAppFlutuante />}
    </PerfilProvider>
  );
}
