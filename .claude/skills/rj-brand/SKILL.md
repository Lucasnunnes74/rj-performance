---
name: rj-brand
description: Identidade visual e voz da RJ Performance (cores, tipografia, logo, fotos, movimento, tom). Use sempre que for criar ou mudar qualquer coisa visual ou textual no site.
---

# RJ Performance — guia de marca

## Essência
- Marca: **RJ Performance** — Rosinaldo Francisco da Silva Júnior, profissional de Educação Física, Itapevi/SP.
- Lema (está na logo): **Disciplina • Evolução • Propósito**. A cruz dourada abaixo do lema faz parte
  da marca: aparece só no rodapé, pequena, como na logo. Não usar como ícone decorativo.
- Conceito do site: **Arrancada** — o velocista da logo saindo em disparada entre o R e o J.

## Cores (tokens em `src/styles/tokens.css`)
| Token | Hex | Uso |
|---|---|---|
| `preto` | #000000 | fundo base (é o preto da logo; não use "quase preto") |
| `carbono` | #141414 | formulário, modal, item aberto |
| `grafite` | #262626 | bordas, divisores |
| `concreto` | #8C8C8C | texto secundário |
| `giz` | #EEEEEE | texto principal |
| `ouro` | #CE9E38 | CTA, linha dourada, foco, palavra-chave visual |
| `ouro-claro` | #F7CB68 | hover/brilho |
| `ouro-escuro` | #98621A | só gradiente; nunca texto |

Proporção: ~85% preto, ~12% giz/concreto, ~3% ouro. Se o dourado aparece em mais de um
elemento por dobra de tela (fora a linha), está demais.

## Tipografia
Família única: **Archivo Variable** (eixos largura 62–125% e itálico). O contraste vem da largura:
- `display-largo` → expandida 125%, itálica, peso 850, caixa alta. Só para a palavra PERFORMANCE
  do hero e no máximo um outro "grito" visual no site.
- `titulo` → expandida 112%, peso 750, caixa normal (sentence case). H2 e H3.
- corpo → largura 100%, peso 400, 17px, entrelinha 1.6, máx. 65 caracteres por linha.
- `lema` → caixa alta espaçada, exclusiva do lema da marca.
Sem segunda família, sem monoespaçada, sem rótulos em caixa alta sobre os títulos.

## Logo (`public/brand/`)
- Arte completa (logo sobre fundo com bola e chuteira): usar no Sobre ou rodapé, nunca recortada.
- O monograma RJ com coroa aparece na camiseta em todas as fotos. Para o navbar/favicon, peça
  ao cliente o arquivo vetorial (SVG/PNG transparente) — está nas pendências.
- Não distorcer, não aplicar sombra, não trocar as cores, não colocar sobre fundo claro.

## Fotos
- Originais em `assets-originais/` (só leitura). Otimizadas em `public/images/fotos/` (640w e 1200w).
- Recortes sem fundo em `public/images/recortes/` para o hero e seção Sobre:
  - `rj-serio-bracos-cruzados-2-recorte.webp` → hero (postura de autoridade)
  - `rj-sorrindo-bracos-cruzados-recorte.webp` → contato / formulário (acolhimento)
  - `rj-costas-logo-vertical-recorte.webp` → seção do lema (mostra a marca nas costas)
  - `rj-perfil-bracos-cruzados-recorte.webp` → Sobre / Para atletas (olhar para frente = evolução)
- Tratamento: sobre fundo preto, uma luz de contorno dourada sutil atrás da figura
  (radial-gradient de `ouro` com 12–18% de opacidade) para separar do fundo e esconder o
  halo claro que o recorte deixou nos ombros.
- Todas as fotos atuais são de estúdio. Fotos de treino em ação vêm dos reels do Instagram.

## Movimento
Ver agente `motion-designer`. Resumo: uma abertura orquestrada no hero; o resto só reage à pessoa.
Easing `--ease-arrancada`. Sempre respeitar `prefers-reduced-motion`.

## Voz
Ver agente `copywriter`. Direta, firme, acolhedora, fala com "você", sem promessas de resultado.
