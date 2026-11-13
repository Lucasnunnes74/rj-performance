# Kit LivON — Site RJ Performance

Kit para construir o site do personal trainer Rosinaldo Jr. com o Claude Code.

## O que tem aqui
```
CLAUDE.md                      → regras do projeto (o Claude Code lê sozinho)
.claude/
  settings.json                → permissões + hooks
  hooks/                       → 5 scripts Node (formatação, proteção, marca, typecheck, contexto)
  agents/                      → 6 agentes: art-director, motion-designer, copywriter,
                                 frontend-engineer, seo-local, qa-reviewer
  skills/                      → rj-brand, section-builder, whatsapp-lead-form,
                                 instagram-showcase, image-pipeline, launch-checklist
src/
  content/site.ts              → todo o texto do site, já com o briefing do cliente
  content/instagram.ts         → lista de posts da seção "No treino"
  lib/whatsapp.ts              → montagem da mensagem e do link wa.me
  styles/tokens.css            → cores da logo, tipografia, easing
  styles/global.css
scripts/optimize-images.mjs    → npm run images
public/
  brand/                       → arte da logo (webp)
  images/fotos/                → 10 fotos otimizadas (640 e 1200px)
  images/recortes/             → 4 fotos com o fundo removido (hero, sobre, para quem, contato)
  images/textura-concreto.webp → textura tirada da parede das fotos
  og-image.jpg                 → imagem de compartilhamento 1200×630
assets-originais/              → originais do cliente + recortes em PNG (só leitura)
docs/
  PLANO.md                     → o plano completo (design, seções, agentes, roteiro)
  PROMPTS.md                   → ROTEIRO: prompts prontos fase a fase
  BRIEFING.md                  → respostas do formulário organizadas
  PENDENCIAS-CLIENTE.md        → o que cobrar do Rosinaldo
  STATUS.md                    → onde o projeto está (carregado a cada sessão)
```

## Começar
1. Siga a **Fase 0** de `docs/PROMPTS.md` (criar o projeto Vite e copiar este kit para dentro).
2. Abra `claude` na pasta e cole o prompt da Fase 1.
3. Uma fase por vez, commit ao final de cada uma.

Requisitos: Node 20+ e Claude Code. Os hooks são em Node, então funcionam em Windows, macOS e Linux.
