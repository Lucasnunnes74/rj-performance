---
name: instagram-showcase
description: Seção "No treino" com os posts/reels do Instagram @rjperformance.oficial — como adicionar, trocar ou remover posts, como o modal com o embed funciona e como migrar para feed automático. Use ao mexer na seção do Instagram.
---

# Seção "No treino" (Instagram)

## Modo padrão: posts escolhidos (sem token, sem API)
Lista curada em `src/content/instagram.ts`. Cada item:
```ts
{ id: "DAbC123xyz", tipo: "reel", url: "https://www.instagram.com/reel/DAbC123xyz/",
  thumb: "/images/instagram/DAbC123xyz.webp", legenda: "Treino de explosão com atleta sub-17" }
```
- O card mostra a **thumbnail local** (rápido, sem script do Instagram na carga da página).
- Ao tocar, abre um **modal** com o embed oficial em `<iframe src="https://www.instagram.com/{p|reel}/{id}/embed" loading="lazy">`.
  O script/iframe do Instagram só carrega quando a pessoa abre o modal (bom para o Lighthouse).
- Botão fixo na seção: "Seguir @rjperformance.oficial" → `https://www.instagram.com/rjperformance.oficial/`
  (nova aba, `rel="noopener noreferrer"`).

## Como adicionar um post
1. Copie o link do post/reel no Instagram ("Copiar link"). O `id` é o trecho depois de `/p/` ou `/reel/`.
2. Salve a capa do reel (print da capa ou download pelo próprio perfil) em
   `assets-originais/instagram/<id>.jpg`.
3. Rode `npm run images` (gera `public/images/instagram/<id>.webp` em 480px, 4:5).
4. Adicione o item em `src/content/instagram.ts` com uma legenda curta e descritiva (vira o `alt`).

## Curadoria (6 a 8 itens)
Priorize posts que mostram **como ele trabalha**: avaliação física, treino de velocidade/explosão
com atleta, treino funcional, correção de execução, aluno comum treinando. Evite repost, meme
e post só de texto. Ordem: o mais forte primeiro.

## Layout
Mobile: trilho horizontal com scroll-snap, cards 4:5 com 78% da largura (o próximo aparece cortado,
convidando a arrastar). Desktop: trilho com setas acessíveis ou grade 4 colunas assimétrica.

## Fase 2 (opcional): feed automático
Só se o Rosinaldo quiser que os posts novos apareçam sozinhos:
- Exige conta **Profissional** (Criador ou Empresa) e um app na Meta com "Instagram API com login do Instagram".
- O token de longa duração vale 60 dias e precisa ser renovado: faça isso numa função serverless
  ou num fluxo n8n agendado que grava os últimos posts num JSON público; o site lê esse JSON.
- Token NUNCA no front-end nem no repositório (`.env` fica bloqueado pelo hook `guard-protected`).
