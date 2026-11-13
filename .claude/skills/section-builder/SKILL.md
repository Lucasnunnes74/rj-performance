---
name: section-builder
description: Passo a passo padrão para criar ou refazer uma seção do site da RJ Performance (plano visual, conteúdo, componente, responsivo, acessibilidade, revisão). Use ao pedir "crie a seção X" ou "refaça a seção X".
---

# Como construir uma seção

## 1. Plano (agente `art-director`)
- Objetivo da seção em uma frase.
- Wireframe ASCII em 360px e 1280px.
- Elemento principal + o que pode sair.

## 2. Texto (agente `copywriter`)
- Conteúdo em `src/content/site.ts`, na chave da seção. Nada no JSX.
- Se faltar dado do cliente: campo `null`, seção/bloco escondido, item em `docs/PENDENCIAS-CLIENTE.md`.

## 3. Componente (agente `frontend-engineer`)
Arquivo `src/components/sections/<Nome>.tsx`:
```tsx
import { conteudo } from "@/content/site";

export function Nome() {
  const c = conteudo.nome;
  return (
    <section id="nome" aria-labelledby="nome-titulo" className="mx-auto max-w-(--container-site) px-5 py-24 md:px-10 md:py-36">
      <h2 id="nome-titulo" className="titulo text-3xl">{c.titulo}</h2>
      {/* ... */}
    </section>
  );
}
```
- Espaçamento vertical entre seções: `py-24` mobile, `md:py-36` desktop. Não somar margem de
  componente interno com padding da seção (evita espaço duplo).
- Alinhamento à esquerda. Grid de 12 colunas no desktop, coluna única no mobile.
- Separador entre seções, quando houver: `<div className="linha-ouro w-24" />`, nunca `<hr>` cinza.

## 4. Movimento (agente `motion-designer`, só se a seção precisar)
Fora do hero, só movimento que responde a uma ação da pessoa.

## 5. Checklist antes de dar como pronta
- [ ] 360px e 1280px sem rolagem horizontal
- [ ] um `<h2>` com id ligado ao `aria-labelledby`
- [ ] imagens com alt, width, height, lazy
- [ ] tudo acessível por teclado, foco visível
- [ ] nenhum hex/cor arbitrária (o hook `brand-guard` avisa)
- [ ] `npm run build` ok
- [ ] `docs/STATUS.md` atualizado
