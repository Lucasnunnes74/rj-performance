# RJ Performance — Plano do site
Portfólio/apresentação do personal trainer **Rosinaldo Jr.** · Projeto LivON · 13/11/2026

---

## 1. Visão geral

**Cliente:** Rosinaldo Francisco da Silva Júnior — marca **RJ Performance**, profissional de Educação Física em Itapevi/SP.
**Público:** atletas (performance) e pessoas em geral (saúde, estética, condicionamento).
**O site precisa, nesta ordem:**
1. Fazer a pessoa chamar no WhatsApp com um pedido já qualificado.
2. Passar autoridade (método, avaliação física, experiência com atletas).
3. Mostrar o trabalho real pelos reels do Instagram.

**Decisões já tomadas**
| Tema | Decisão |
|---|---|
| Formato | One-page, mobile first (o tráfego vem do Instagram) |
| Stack | React + Vite + TypeScript + Tailwind v4 + Motion |
| Contato | Formulário em etapas que abre o WhatsApp com a mensagem pronta (sem backend) |
| Instagram | Posts escolhidos a dedo com capa local + modal com o embed oficial (sem token). Feed automático = fase 2 opcional |
| Conceito visual | **"Arrancada"** — o velocista da logo saindo em disparada |
| Desenvolvimento | Claude Code com 6 agentes, 6 skills e 5 hooks (kit pronto) |

**O kit entrega pronto:** `CLAUDE.md`, agentes, skills, hooks, tokens de cor/tipo, todo o texto do briefing em `src/content/site.ts`, a lib do WhatsApp, 10 fotos otimizadas, **4 recortes sem fundo**, textura de concreto, imagem de compartilhamento e o roteiro de prompts. O kit foi testado: compila e gera o build num projeto Vite novo.

---

## 2. Briefing consolidado

| | |
|---|---|
| Cores | Preto e dourado |
| Cidade | Itapevi – SP |
| WhatsApp | (11) 94908-3103 |
| Instagram | @rjperformance.oficial |
| Domínio | não tem |
| Depoimentos, referências, endereço, horário | não informados |

**Serviços (9):** treinamento personalizado · preparação física para atletas · força e resistência · velocidade e explosão muscular · condicionamento físico · hipertrofia e emagrecimento · funcional · avaliação física e acompanhamento · mobilidade, flexibilidade e core.

**Diferencial (palavras dele):** atendimento personalizado, dedicação, compromisso, conhecimento técnico, experiência com atletas e público geral, metodologia focada em resultados, evolução e qualidade de vida.

### Pendências para cobrar do Rosinaldo
Lista completa em `docs/PENDENCIAS-CLIENTE.md`. As que travam o lançamento:
- **Número do CREF** (credibilidade; obrigatório para a profissão)
- **Logo em PNG transparente ou SVG** (só veio a arte com fundo — precisa para navbar e favicon)
- **6 a 8 links de reels/posts** que mostram como ele trabalha
- **Onde atende** (academia, domicílio, ao ar livre, online?)
- Aprovar os textos marcados como rascunho (Como funciona e FAQ)

Recomendado depois: depoimentos com autorização, atletas/clubes que preparou, formação, anos de experiência, fotos treinando alunos (todas as atuais são de estúdio).

> Regra: o que não chegou fica **escondido** no site. Nada de número, depoimento ou CREF inventado.

---

## 3. Direção de arte

### Conceito: "Arrancada"
A logo mostra um velocista explodindo para frente entre o R e o J, com rastros de velocidade e uma linha dourada sob PERFORMANCE. O site é sobre esse instante: força parada que vira movimento. Daí saem três recursos, e só eles:
- **O itálico expandido** como movimento da marca (igual à palavra PERFORMANCE da logo).
- **A linha dourada** como único ornamento recorrente: separa seções, sublinha o CTA, vira a barra de progresso do formulário (a "pista").
- **O concreto**: as fotos foram feitas numa parede de cimento queimado. Uma textura tirada dessas fotos vira a pele das superfícies escuras e liga o site às fotos.

### Paleta (extraída da logo)
| Nome | Hex | Uso |
|---|---|---|
| Preto | #000000 | fundo (o preto puro da logo) |
| Carbono | #141414 | formulário, modal, item aberto |
| Grafite | #262626 | bordas |
| Concreto | #8C8C8C | texto secundário (tom da parede das fotos) |
| Giz | #EEEEEE | texto principal (o branco do "R") |
| Ouro | #CE9E38 | CTA, linha, foco — contraste 8,8:1 sobre preto |
| Ouro claro | #F7CB68 | brilho/hover |
| Ouro escuro | #98621A | só gradiente, nunca texto |

Proporção: ~85% preto, ~12% giz/concreto, ~3% ouro.

### Tipografia
Uma família só: **Archivo Variable**. O contraste vem do eixo de largura:
- **Display** (só a palavra PERFORMANCE do hero): largura 125%, itálico, peso 850, caixa alta.
- **Títulos**: largura 112%, peso 750, caixa normal.
- **Corpo**: largura 100%, 17px, entrelinha 1.6, até 65 caracteres por linha.
- **Lema** "Disciplina • Evolução • Propósito": caixa alta espaçada, exclusivo do lema, como na logo.

### Fotos
Os 4 recortes sem fundo resolvem o problema das fotos de estúdio com parede clara num site preto:
| Recorte | Onde |
|---|---|
| Sério, braços cruzados | Hero (autoridade) |
| De perfil, olhando à frente | Sobre (evolução) |
| De costas, apontando a logo | Pilares / "Para atletas" |
| Sorrindo, braços cruzados | Formulário (acolhimento) |

Um halo dourado sutil atrás da figura separa do fundo e disfarça o leve contorno claro que o recorte deixou nos ombros. Para acabamento de agência, refinar os PNGs no remove.bg/Photoshop.

### Movimento
Um único momento orquestrado: a **abertura do hero** (≤ 1,1 s) — rastros dourados cruzam a tela, PERFORMANCE entra deslizando com desfoque de velocidade, a linha dourada se desenha, o Rosinaldo surge, depois título e CTA. Fora do hero, só movimento em resposta à pessoa (etapas do formulário, acordeão, modal). `prefers-reduced-motion` sempre respeitado.

### O que fica proibido (vícios de site genérico)
Grade de cards iguais para serviços · rótulo em caixa alta acima de cada título · palavra destacada em outra cor no título · fade-up em toda seção · gradiente decorativo · estatística inventada · ícone de haltere em tudo.

---

## 4. Arquitetura do site (one-page)

| # | Seção | Objetivo | Destaque |
|---|---|---|---|
| 1 | Navbar | navegar e chamar | monograma RJ + botão WhatsApp |
| 2 | **Hero** | impacto + CTA em 1 tela | PERFORMANCE gigante atrás do recorte, H1 "Personal trainer e preparação física em Itapevi" |
| 3 | Lema | assinatura da marca | letreiro "DISCIPLINA • EVOLUÇÃO • PROPÓSITO" |
| 4 | Pilares | diferenciais | os 3 valores como lista grande, não cards |
| 5 | Sobre | humanizar | recorte de perfil sobre concreto; CREF quando chegar |
| 6 | Serviços | o que ele faz | "ficha de treino" em 3 grupos: Performance esportiva · Corpo e saúde · Base do treino |
| 7 | Para quem | falar com os 2 públicos | seletor **Sou atleta / Quero treinar** que pré-preenche o formulário |
| 8 | Como funciona | reduzir medo | 4 passos em "pista": avaliação → plano → treino → reavaliação |
| 9 | No treino | prova real | reels do Instagram em trilho deslizante + modal |
| 10 | Depoimentos | prova social | escondida até ter depoimentos reais |
| 11 | FAQ | tirar objeções | só perguntas com resposta aprovada |
| 12 | **Contato** | converter | formulário em etapas → WhatsApp |
| 13 | Rodapé | fechar | lema, cruz dourada (como na logo), contatos, "Site por LivON" |
| + | Botão flutuante | atalho | WhatsApp, aparece depois do hero |

**Wireframe do hero (desktop)**
```
┌──────────────────────────────────────────────────────────────┐
│ RJ                     Serviços  Método  No treino  [WhatsApp]│
│  ╱╱╱ rastros             ┌──────────┐                        │
│  P E R F O R M│A N C E   │ recorte  │  ← palavra atrás da    │
│  ━━━━━━━━━━━━━│━━━━━━━━  │ Rosinaldo│    figura              │
│  Personal trainer e preparação física em Itapevi             │
│  Treino planejado para atletas e para quem quer mais...      │
│  [Agendar avaliação pelo WhatsApp]   Ver o treino no Instagram│
└──────────────────────────────────────────────────────────────┘
```
No celular: PERFOR/MANCE em duas linhas atrás do recorte, CTA visível sem rolar em 390×844.

---

## 5. Stack e estrutura

React 19 · Vite · TypeScript · Tailwind CSS v4 (tokens via `@theme`) · Motion · react-hook-form + zod · Archivo Variable (fontsource) · oxlint + Prettier.

```
src/content/      todo o texto (site.ts) e posts (instagram.ts)
src/lib/          whatsapp.ts
src/styles/       tokens.css, global.css
src/components/   ui/ (Botao, Chip, Modal, LinhaOuro...) e sections/ (Hero, Servicos...)
public/           brand/, images/fotos, images/recortes, og-image.jpg
assets-originais/ originais do cliente (protegidos por hook)
docs/             PLANO, PROMPTS, BRIEFING, STATUS, PENDENCIAS-CLIENTE
```

Regras de ouro (no `CLAUDE.md`): cor só por token · texto só em `src/content` · WhatsApp só pela lib · nada inventado · sem promessa de resultado (ética CONFEF) · acessível e mobile first.

---

## 6. Agentes, skills e hooks

### Agentes (`.claude/agents/`)
| Agente | Papel | Quando acionar |
|---|---|---|
| **art-director** | Diretor de arte/UI. Protege o conceito "Arrancada", faz wireframe antes e revisão por screenshot depois, aplica o teste anti-template | Antes e depois de cada seção |
| **motion-designer** | Animação com Motion: abertura do hero, etapas do formulário, modal, acordeão. Sempre com reduced motion | Hero, formulário, interações |
| **copywriter** | Textos em PT-BR com a voz da marca (Disciplina • Evolução • Propósito), CTAs que dizem o que acontece, sem promessas. Só edita `src/content` | Toda seção com texto |
| **frontend-engineer** | Implementa componentes React/TS/Tailwind com padrões de imagem, acessibilidade e performance | Construção |
| **seo-local** | Metatags, Open Graph, JSON-LD LocalBusiness + Person, sitemap, foco em "personal trainer em Itapevi" | Fase de SEO |
| **qa-reviewer** | Revisão independente: responsivo, fluxo do WhatsApp, Instagram, acessibilidade, Lighthouse. Relatório por prioridade | Fim de cada fase e antes de lançar |

### Skills (`.claude/skills/`)
| Skill | O que ensina |
|---|---|
| **rj-brand** | paleta, tipografia, uso da logo, qual recorte vai onde, movimento e voz |
| **section-builder** | passo a passo padrão de uma seção + checklist de pronto |
| **whatsapp-lead-form** | as 5 etapas, validação zod, mensagem gerada, estados de envio |
| **instagram-showcase** | como adicionar posts, layout do trilho, modal com embed, fase 2 com API |
| **image-pipeline** | `npm run images`, nomes, recorte de fundo, uso de srcSet |
| **launch-checklist** | deploy (Vercel ou Coolify), domínio, Search Console, Perfil da Empresa no Google |

### Hooks (`.claude/settings.json` + `.claude/hooks/*.mjs`, em Node, funcionam no Windows)
| Evento | Hook | O que faz |
|---|---|---|
| SessionStart | `session-context` | Carrega `STATUS.md` e `PENDENCIAS-CLIENTE.md` no início de toda sessão: o Claude sempre sabe onde parou |
| PreToolUse | `guard-protected` | Bloqueia edição de fotos originais, da logo, de `.env` e do lockfile |
| PostToolUse | `format-on-edit` | Prettier + oxlint --fix no arquivo editado |
| PostToolUse | `brand-guard` | Avisa o Claude na hora se usou cor fora do token, montou link do WhatsApp à mão, deixou `<img>` sem alt/dimensões ou escreveu promessa de resultado |
| Stop | `typecheck-on-stop` | Roda o typecheck antes de encerrar; se der erro, o Claude corrige antes de parar (com proteção contra loop) |

Todos foram testados com entradas simuladas e num projeto Vite real.

---

## 7. Formulário → WhatsApp e Instagram

### Formulário "Monte seu ponto de partida"
Uma pergunta por vez, respostas em chips: rápido no celular e prende a atenção.
1. Objetivo → 2. Momento atual (se "Sou atleta": modalidade) → 3. Horários → 4. Nome, WhatsApp, dúvida → 5. Resumo "Seu pedido" → **Enviar no WhatsApp**

Abre `wa.me/5511949083103` com a mensagem pronta:
```
Olá, Rosinaldo! Vim pelo site da RJ Performance.

*Nome:* Ana Souza
*WhatsApp:* (11) 91234-5678
*Objetivo:* Emagrecimento
*Momento:* Treino às vezes
*Horários:* Manhã, Fim de semana
*Dúvida:* Você atende em condomínio?

Quero agendar minha avaliação.
```
A função já está pronta em `src/lib/whatsapp.ts`. Opcional depois: gravar cada lead numa planilha por um webhook do n8n, sem nunca travar o envio.

### Instagram "No treino"
- **Agora:** 6–8 reels escolhidos, capa salva localmente (carrega rápido), embed oficial só quando a pessoa toca. Botão "Seguir @rjperformance.oficial".
- **Fase 2 (opcional):** feed automático. Exige conta Profissional + app na Meta + renovação do token a cada 60 dias (fluxo n8n agendado gerando um JSON). O token nunca vai para o front-end.

---

## 8. Roteiro de execução

Prompts completos para colar no Claude Code estão em **`docs/PROMPTS.md`**.

| Fase | Entrega | Agentes |
|---|---|---|
| 0 | Criar projeto Vite, instalar dependências, copiar o kit, (opcional) Playwright MCP | você |
| 1 | Config (Tailwind, alias), componentes base, esqueleto da página | frontend-engineer |
| 2 | **Hero** com abertura animada | art-director → motion-designer → frontend-engineer |
| 3 | Lema, Pilares, Sobre | art-director, copywriter, frontend-engineer |
| 4 | Serviços, Para quem, Como funciona | idem |
| 5 | Formulário em etapas + botão flutuante | frontend-engineer, motion-designer, qa-reviewer |
| 6 | Seção do Instagram | frontend-engineer |
| 7 | FAQ, Depoimentos (escondido), Rodapé | section-builder |
| 8 | SEO local | seo-local |
| 9 | Revisão final | qa-reviewer + art-director |
| 10 | Deploy e pós-lançamento | launch-checklist |

**Comandos da Fase 0**
```bash
npm create vite@latest rj-performance -- --template react-ts
cd rj-performance && npm install
npm i motion react-hook-form zod @hookform/resolvers @fontsource-variable/archivo lucide-react
npm i -D tailwindcss @tailwindcss/vite prettier sharp @types/node
# copie o conteúdo do kit (inclusive .claude/) para dentro da pasta
claude mcp add playwright npx @playwright/mcp@latest   # opcional: screenshots para os agentes
claude
```

### Lançamento
- **Hospedagem:** Vercel (preview por link para o cliente aprovar) ou a sua VPS com Coolify (build estático, HTTPS automático).
- **Domínio:** ele não tem. Verificar no registro.br: `rjperformance.com.br`, `rosinaldojr.com.br`.
- **Depois:** Search Console + sitemap, **Perfil da Empresa no Google em Itapevi** (maior alavanca de SEO local), link na bio do Instagram.
- **Meta Lighthouse mobile:** Performance ≥ 90 · Acessibilidade ≥ 95 · Boas práticas ≥ 95 · SEO 100.
