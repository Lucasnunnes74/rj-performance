---
name: launch-checklist
description: Checklist de lançamento e deploy do site da RJ Performance (build, Lighthouse, domínio, Vercel ou Coolify, Search Console, Google Perfil da Empresa, link na bio). Use quando o site estiver pronto para publicar ou ao trocar de hospedagem.
---

# Lançamento

## 1. Antes do deploy
- [ ] Rodar o agente `qa-reviewer` e zerar os itens "Bloqueia lançamento".
- [ ] `docs/PENDENCIAS-CLIENTE.md`: o que ainda falta está escondido no site (não vazio).
- [ ] Cliente aprovou textos e fotos (mandar link de preview).
- [ ] Testar o envio real para o WhatsApp do Rosinaldo (combinar com ele).

## 2. Hospedagem (site estático: pasta `dist/`)
**Opção A — Vercel (mais simples):** importar o repositório do GitHub, framework "Vite",
build `npm run build`, saída `dist`. Preview automático a cada push (ótimo para aprovação do cliente).

**Opção B — VPS própria com Coolify:** novo recurso → repositório GitHub → build pack "Static"
(ou Nixpacks com `npm run build` e diretório `dist`). Domínio + HTTPS automático (Let's Encrypt)
pelo próprio Coolify.

## 3. Domínio
O cliente não tem domínio. Sugestões para checar no registro.br: `rjperformance.com.br`,
`rjperformance.fit` (gTLD), `rosinaldojr.com.br`. Apontar o DNS (A/CNAME) para a hospedagem escolhida.

## 4. Depois do deploy
- [ ] Atualizar domínio em `index.html` (canonical, og:url), `robots.txt` e `sitemap.xml`.
- [ ] Google Search Console: verificar domínio e enviar o sitemap.
- [ ] Perfil da Empresa no Google em Itapevi com link do site (maior alavanca de SEO local).
- [ ] Link do site na bio do Instagram + destaque "Site" nos stories.
- [ ] Lighthouse mobile no domínio final: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO 100.
- [ ] (Opcional) Analytics leve (Plausible ou Umami no Coolify) com evento no clique "Enviar no WhatsApp".
