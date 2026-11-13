# Roteiro de execução — prompts prontos para o Claude Code

Rode uma fase por vez. Ao final de cada uma: teste no navegador, faça commit e siga para a próxima.
Os prompts citam os agentes pelo nome; o Claude Code delega para eles automaticamente.

---

## Fase 0 — Preparar o projeto (no terminal, você mesmo)

```bash
npm create vite@latest rj-performance -- --template react-ts
cd rj-performance
npm install
npm i motion react-hook-form zod @hookform/resolvers @fontsource-variable/archivo lucide-react
npm i -D tailwindcss @tailwindcss/vite prettier sharp @types/node
git init
```

Copie TODO o conteúdo do kit para dentro da pasta `rj-performance/` (inclusive as pastas ocultas
`.claude/`). Quando perguntar, substitua arquivos; a pasta `src/` do kit se mistura com a do Vite.

Opcional, mas recomendado (deixa os agentes tirarem screenshot da tela):
```bash
claude mcp add playwright npx @playwright/mcp@latest
```

Abra o Claude Code na pasta: `claude`

---

## Fase 1 — Fundação

```
Leia o CLAUDE.md, a skill rj-brand e o docs/STATUS.md.
Configure o projeto:
1. vite.config.ts com o plugin @tailwindcss/vite e alias "@" → src
   (resolve.alias com path.resolve(import.meta.dirname, "src")) e em tsconfig.app.json
   "paths": { "@/*": ["./src/*"] }.
2. src/main.tsx importando src/styles/global.css. Apague App.css, index.css e assets do template.
3. index.html com lang="pt-BR", title provisório e theme-color preto.
4. package.json: script "images": "node scripts/optimize-images.mjs"; .prettierrc com printWidth 110.
5. Mantenha o oxlint que veio no template (npm run lint).
Depois use o agente frontend-engineer para criar os componentes base em src/components/ui:
Container, Botao (variantes: ouro sólido e contorno), LinkWhatsApp (usa buildWhatsAppUrl), Chip,
LinhaOuro e Modal acessível (trap de foco, Esc, foco volta ao gatilho).
Monte o App.tsx com as seções vazias na ordem do plano (Navbar, Hero, Lema, Pilares, Sobre,
Servicos, ParaQuem, Metodo, NoTreino, Depoimentos, Faq, Contato, Rodape) e o botão flutuante do WhatsApp.
Rode npm run build e atualize docs/STATUS.md.
```

---

## Fase 2 — Hero (o momento memorável)

```
Use o agente art-director para planejar o Hero seguindo o conceito "Arrancada" da skill rj-brand.
Referência de composição (desktop):

  ┌──────────────────────────────────────────────────────────────┐
  │ RJ (logo)              Serviços  Método  No treino   [WhatsApp]│
  │                                                                │
  │  ╱╱╱ rastros          ┌──────────┐                             │
  │  P E R F O R M│A N C E│ recorte  │   ← palavra gigante atrás   │
  │  ━━━━━━━━━━━━━│━━━━━━━│ Rosinaldo│     da figura (z-index)     │
  │  H1: Personal trainer e preparação física em Itapevi           │
  │  subtítulo (2 linhas)             │          │                 │
  │  [Agendar avaliação pelo WhatsApp]  Ver o treino no Instagram   │
  └──────────────────────────────────────────────────────────────┘

Mobile: palavra PERFORMANCE em 2 linhas (PERFOR / MANCE) atrás do recorte, recorte ocupando
~70% da altura, H1 + CTA abaixo, CTA visível sem rolar em 390×844.
Halo dourado radial atrás da figura. Depois o agente motion-designer implementa a sequência de
abertura descrita no arquivo dele (≤ 1,1 s, com reduced motion). Por fim o frontend-engineer
garante LCP: recorte com fetchPriority="high", preload no index.html, fonte com font-display swap.
Tire screenshot em 390px e 1280px e peça ao art-director uma revisão crítica antes de concluir.
```

---

## Fase 3 — Lema, Pilares e Sobre

```
Use a skill section-builder para criar três seções:
1. Lema: faixa de letreiro com "DISCIPLINA • EVOLUÇÃO • PROPÓSITO" (utilitário lema, em giz
   com os pontos em ouro), rolagem lenta infinita que pausa no hover e para com reduced motion.
2. Pilares: os 3 itens de conteudo.pilares. NÃO usar 3 cards iguais. Proposta: lista vertical
   grande, cada nome em display (titulo, 112%) com a linha dourada à esquerda e o texto ao lado
   no desktop; o recorte de costas (logo nas costas) entra aqui no desktop.
3. Sobre: superfície concreto (utilitário superficie-concreto), recorte de perfil à esquerda,
   texto à direita, CREF e anos de experiência só se não forem null.
Peça ao art-director o plano antes e a revisão por screenshot depois.
```

---

## Fase 4 — Serviços, Para quem e Método

```
Use a skill section-builder.
1. Servicos: 3 grupos de conteudo.servicos. Formato "ficha de treino": cada grupo é um bloco com
   título; cada serviço é uma linha (nome grande + descrição) que abre como acordeão no mobile.
   Proibido grade de cards arredondados com ícone. A linha dourada marca o item aberto.
2. ParaQuem: seletor segmentado "Sou atleta / Quero treinar" (role="tablist") que troca texto e
   imagem com transição curta. Guarde a escolha num contexto React (PerfilContext) para pré-preencher
   o formulário (objetivoPadrao / momentoPadrao). CTA: "Montar meu pedido" → rola até #contato.
3. Metodo: 4 passos (aqui numeração faz sentido: é sequência). Linha horizontal no desktop,
   vertical no mobile, como uma pista com 4 marcações.
Copywriter revisa os textos; art-director revisa por screenshot.
```

---

## Fase 5 — Formulário em etapas → WhatsApp

```
Siga a skill whatsapp-lead-form à risca. Crie src/components/sections/Contato.tsx com o formulário
em 5 etapas (react-hook-form + zod), chips acessíveis (radio/checkbox reais estilizados), barra de
progresso dourada, botão Voltar, resumo editável e envio por buildWhatsAppUrl(montarMensagem(dados)).
Lado visual: recorte sorrindo de braços cruzados + frase curta de acolhimento.
Pré-preencha com o PerfilContext da seção ParaQuem.
Botão flutuante do WhatsApp: aparece só depois que o hero sai da tela (IntersectionObserver),
com aria-label "Conversar com Rosinaldo no WhatsApp".
O motion-designer cuida da troca de etapa. O qa-reviewer testa o fluxo completo e mostra a URL gerada.
```

---

## Fase 6 — Instagram ("No treino")

```
Siga a skill instagram-showcase. Crie NoTreino.tsx lendo src/content/instagram.ts:
trilho com scroll-snap no mobile, cards 4:5 com thumbnail local e ícone de play para reel,
modal com o iframe de embed carregado só ao abrir, botão "Seguir @rjperformance.oficial".
Se a lista estiver vazia, mostre só o título, o texto e o botão de seguir (sem cards vazios).
```
Depois, VOCÊ: escolha os posts no perfil, salve as capas em `assets-originais/instagram/`,
rode `npm run images` e preencha `src/content/instagram.ts` (ou peça ao Claude com os links).

---

## Fase 7 — FAQ, Depoimentos e Rodapé

```
Use a skill section-builder.
1. Faq: acordeão acessível (<details>/<summary> estilizado ou botões com aria-expanded);
   esconder perguntas com resposta null.
2. Depoimentos: componente pronto, mas renderiza null enquanto conteudo.depoimentos.itens estiver vazio.
3. Rodape: logo, lema com a pequena cruz dourada entre duas linhas (como na logo), WhatsApp,
   Instagram, cidade, CREF se existir, "Site por LivON".
```

---

## Fase 8 — SEO local

```
Use o agente seo-local para fazer todas as entregas descritas no arquivo dele.
A imagem de compartilhamento já existe em public/og-image.jpg (1200×630).
Domínio ainda não definido: use https://SEU-DOMINIO.com.br como placeholder e liste onde trocar.
```

---

## Fase 9 — Revisão final

```
Use o agente qa-reviewer para o roteiro completo de revisão. Corrija tudo que for
"Bloqueia lançamento" e "Importante". Depois peça ao art-director uma última revisão visual
por screenshot de todas as seções em 390px e 1280px, aplicando a regra "tire um acessório".
```

---

## Fase 10 — Lançamento

```
Siga a skill launch-checklist. Hospedagem: [Vercel | minha VPS com Coolify].
```
