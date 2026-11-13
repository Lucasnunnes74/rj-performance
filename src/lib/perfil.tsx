import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Perfil = "atleta" | "geral";

type PerfilCtx = { perfil: Perfil | null; setPerfil: (p: Perfil) => void };

const Ctx = createContext<PerfilCtx>({ perfil: null, setPerfil: () => {} });

export function PerfilProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const value = useMemo(() => ({ perfil, setPerfil }), [perfil]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const usePerfil = () => useContext(Ctx);
