# Status do projeto RJ Performance

Atualize ao final de cada fase (este arquivo é carregado no início de toda sessão do Claude Code).

**Fase atual:** 7 concluída (fases 1–7 do roteiro). Faltam SEO local (8), revisão final (9) e lançamento (10).
**Próximo passo:** Fase 8 em `docs/PROMPTS.md` (agente seo-local), depois revisão visual com screenshots.

## Feito

- Projeto Vite + React 19 + TS + Tailwind v4 + Motion configurado (alias `@`, tokens, fonte Archivo).
- Componentes base em `src/components/ui` (Container, Botao, LinkWhatsApp, Chip, LinhaOuro, Modal com `<dialog>`).
- Todas as seções em `src/components/sections`: Navbar, Hero (abertura animada), Lema (letreiro), Pilares, Sobre,
  Servicos (acordeão no mobile), ParaQuem (seletor + PerfilContext), Metodo, NoTreino, Depoimentos (escondido),
  Faq (esconde respostas null), Contato (formulário em 5 etapas → WhatsApp), Rodape, botão flutuante.
- Formulário testado: gera a mensagem e a URL wa.me corretas.

## Decisões

- Stack: React + Vite + TS + Tailwind v4 + Motion.
- Instagram: posts escolhidos com thumbnail local + modal com embed (sem token). `postsInstagram` está vazio: a seção mostra só título + botão seguir.
- Navbar usa o texto "RJ" provisório até chegar a logo em PNG/SVG transparente.
- Favicon provisório: arte completa da logo.

## Em aberto

- Ver `docs/PENDENCIAS-CLIENTE.md` (CREF, logo transparente, links de reels, local de atendimento, aprovar textos).
- Fases 8 (SEO), 9 (QA) e 10 (deploy).
- Revisar visualmente cada seção em 390px e 1280px.

## Fase 8 — SEO local (feito)
- `index.html`: title, description, canonical, Open Graph, Twitter Card e JSON-LD (LocalBusiness + Person). Sem endereço, horário ou avaliações.
- `public/robots.txt` e `public/sitemap.xml` criados.
- **Trocar `https://SEU-DOMINIO.com.br`** em: `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD), `public/robots.txt`, `public/sitemap.xml`.
- Pendente: apple-touch-icon (precisa do monograma RJ em PNG), Search Console, Perfil da Empresa no Google, link na bio.

## Fase 9 — Revisão (parcial)
- Celular (375px): sem rolagem horizontal, todas as imagens com alt, títulos H1 > H2 > H3 sem pular nível, CTA do hero visível sem rolar.
- Formulário testado até a URL do WhatsApp.
- Não feito: Lighthouse, teste em aparelho real, revisão visual de cada seção em 1280px.

## Instagram automático (Behold)
- `src/lib/useReelsInstagram.ts` lê o feed público do Behold (só reels, até 8, mais recentes primeiro) e cai na lista manual se falhar.
- **Falta:** criar o feed no behold.so conectando @rjperformance.oficial e colar a URL (`https://feeds.behold.so/<id>`) em `feedInstagramUrl` em `src/content/instagram.ts`. Conta precisa ser profissional.
- Após publicar, adicionar o domínio final na lista de domínios permitidos do feed (localhost já é liberado).
