# RJ Performance — site/portfólio do personal trainer Rosinaldo Jr.

Projeto da LivON. Site de uma página (one-page) que apresenta o personal trainer
Rosinaldo Francisco da Silva Júnior (marca **RJ Performance**, Itapevi/SP) e
converte visitantes em conversas no WhatsApp.

## Objetivo do site (em ordem de prioridade)
1. Fazer a pessoa chamar no WhatsApp com um pedido qualificado (objetivo, nível, disponibilidade).
2. Passar autoridade: método, avaliação física, experiência com atletas.
3. Mostrar o trabalho real pelos posts/reels do Instagram @rjperformance.oficial.

## Stack
- React 19 + Vite + TypeScript (template `react-ts`)
- Tailwind CSS v4 (`@tailwindcss/vite`), tokens em `src/styles/tokens.css` via `@theme`
- Motion (`motion/react`) para animação
- react-hook-form + zod no formulário
- Fonte: Archivo (variável, eixos `wdth` e `ital`) via `@fontsource-variable/archivo`
- oxlint (padrão do template Vite) + Prettier — formatação e lint automáticos por hook

## Comandos
- `npm run dev` — servidor local
- `npm run build` — typecheck + build de produção
- `npm run preview` — testar o build
- `npm run lint` — oxlint
- `npm run images` — gera versões otimizadas das fotos (skill `image-pipeline`)

## Estrutura
```
src/
  content/       # TODO o texto e dado do site (site.ts, instagram.ts) — nada de texto solto em componente
  lib/           # whatsapp.ts (montagem da mensagem), utils
  styles/        # tokens.css (cores, fontes, escala), global.css
  components/
    ui/          # Button, Chip, Modal, Field...
    sections/    # Hero, Pilares, Servicos, ParaQuem, Metodo, NoTreino, Faq, Contato, Footer
  App.tsx
public/
  brand/         # logo (NÃO editar)
  images/        # fotos otimizadas, recortes sem fundo, textura
assets-originais/ # fotos originais do cliente (NÃO editar, NÃO importar no código)
docs/            # briefing, prompts por fase, status, pendências do cliente
```

## Regras do projeto
- **Cores e fontes só por token.** Nada de hex solto em componente (`#CE9E38`, `bg-[#...]`).
  Use as classes do tema (`bg-preto`, `text-ouro`, `font-display`...). O hook `brand-guard` avisa.
- **Texto só em `src/content/`.** Componentes recebem conteúdo por import/props.
- **WhatsApp só via `src/lib/whatsapp.ts`.** Número: 55 11 94908-3103. Nunca montar `wa.me` à mão.
- **Não inventar dados**: números de alunos, anos de experiência, depoimentos, CREF, preços.
  O que faltar fica em `docs/PENDENCIAS-CLIENTE.md` e a UI esconde o bloco (flag no content).
- **Ética de Educação Física**: sem promessa de resultado garantido, sem "antes e depois"
  sem autorização por escrito, sem prescrição de dieta/suplemento.
- **Acessibilidade**: foco visível, `alt` descritivo em toda imagem, contraste AA,
  `prefers-reduced-motion` respeitado em toda animação.
- **Mobile first.** A maioria do tráfego vem do Instagram, no celular. Testar em 360px.
- Imagens sempre `.webp` com `width`/`height` e `loading="lazy"` (exceto o hero).
- Idioma do site: português do Brasil, frases curtas, tom direto e motivador, sem gíria de coach.

## Time de agentes (`.claude/agents/`)
| Agente | Quando usar |
|---|---|
| `art-director` | direção visual, layout de seção, revisão de tela por screenshot |
| `motion-designer` | animação do hero, transições do formulário, microinterações |
| `copywriter` | headlines, CTAs, textos de seção, FAQ |
| `frontend-engineer` | implementação de componentes e lógica |
| `seo-local` | metatags, JSON-LD, SEO local Itapevi |
| `qa-reviewer` | revisão final: responsivo, a11y, performance, links, WhatsApp |

## Skills (`.claude/skills/`)
`rj-brand` · `section-builder` · `whatsapp-lead-form` · `instagram-showcase` · `image-pipeline` · `launch-checklist`

## Fluxo de trabalho
Siga as fases de `docs/PROMPTS.md`. Ao terminar uma fase, atualize `docs/STATUS.md`
(o hook de início de sessão carrega esse arquivo automaticamente).
