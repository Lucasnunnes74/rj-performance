---
name: image-pipeline
description: Otimização e recorte de imagens do site (webp em 640/1200px, capas do Instagram, recorte sem fundo). Use quando o cliente mandar fotos novas, ao adicionar capas de reels ou se o Lighthouse reclamar de imagens.
---

# Pipeline de imagens

## Comando
`npm run images` → executa `scripts/optimize-images.mjs` (usa `sharp`, instale com `npm i -D sharp`).

O script:
- lê `assets-originais/*.jpg|jpeg|png` → grava `public/images/fotos/<nome>-640.webp` e `-1200.webp` (qualidade 80);
- lê `assets-originais/instagram/*` → grava `public/images/instagram/<id>.webp` em 480×600 (4:5, corte central);
- nunca sobrescreve originais (a pasta `assets-originais/` é protegida pelo hook).

## Nomes
Descritivos, minúsculos, com hífen: `rj-sorrindo-bracos-cruzados`. O nome ajuda a escrever o `alt`.

## Recorte sem fundo (já feito para 4 fotos)
Os recortes em `public/images/recortes/` foram gerados com `rembg` (modelo `u2net_human_seg`).
Os PNGs em alta ficam em `assets-originais/recortes-png/`. Se o cliente mandar fotos novas
e quiser recorte: `pip install "rembg[cpu]"` e
`rembg i -m u2net_human_seg entrada.jpg saida.png`, depois converta para webp.
Para acabamento profissional do contorno, use o remove.bg ou o Photoshop no PNG.

## Uso no JSX
```tsx
<img
  src="/images/fotos/rj-sorrindo-1200.webp"
  srcSet="/images/fotos/rj-sorrindo-640.webp 640w, /images/fotos/rj-sorrindo-1200.webp 1200w"
  sizes="(min-width: 768px) 40vw, 90vw"
  width={1200} height={1600}
  alt="Rosinaldo sorrindo com a camiseta preta da RJ Performance"
  loading="lazy" decoding="async"
/>
```
