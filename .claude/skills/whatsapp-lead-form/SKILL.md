---
name: whatsapp-lead-form
description: Como funciona e como alterar o formulário em etapas que monta a mensagem e abre o WhatsApp do Rosinaldo (55 11 94908-3103). Use ao criar, mudar campos, textos ou validação do formulário de contato.
---

# Formulário "Monte seu ponto de partida" → WhatsApp

Sem backend: o formulário monta um texto e abre `https://wa.me/5511949083103?text=...`.
Toda a lógica de URL está em `src/lib/whatsapp.ts` (`buildWhatsAppUrl`, `montarMensagem`).

## Por que em etapas
Uma pergunta por vez com respostas em chips é rápido no celular, prende a atenção (efeito
"já comecei, vou terminar") e entrega ao Rosinaldo um pedido já qualificado.

## Etapas (conteúdo em `src/content/site.ts` → `formulario`)
1. **Seu objetivo** (chips, 1 escolha): Performance esportiva · Hipertrofia · Emagrecimento ·
   Condicionamento físico · Mobilidade e core · Ainda não sei
2. **Seu momento** (chips): Nunca treinei · Treino às vezes · Treino com frequência · Sou atleta
   - Se "Sou atleta" → campo extra opcional "Qual modalidade?" (texto curto)
3. **Quando você pode treinar** (chips, várias escolhas): Manhã · Tarde · Noite · Fim de semana
4. **Seus dados**: Nome (obrigatório), WhatsApp com DDD (obrigatório), Dúvida ou observação (opcional, 300 caracteres)
5. **Seu pedido** (resumo editável) → botão **Enviar no WhatsApp**

Barra de progresso = linha dourada que avança (a "pista"). Botão "Voltar" em todas as etapas após a 1ª.
O seletor "Sou atleta / Quero treinar" da seção Para Quem pré-seleciona a etapa 1 e 2.

## Validação (zod)
```ts
const schema = z.object({
  objetivo: z.string().min(1, "Escolha um objetivo para continuar"),
  momento: z.string().min(1, "Escolha a opção mais próxima de você"),
  modalidade: z.string().max(60).optional(),
  horarios: z.array(z.string()).min(1, "Escolha pelo menos um período"),
  nome: z.string().trim().min(2, "Informe seu nome"),
  whatsapp: z.string().transform((v) => v.replace(/\D/g, "")).refine((v) => /^\d{10,11}$/.test(v), "Informe seu WhatsApp com DDD, ex.: 11 91234-5678"),
  mensagem: z.string().max(300).optional(),
});
```

## Mensagem gerada (exemplo)
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

## Detalhes que importam
- `encodeURIComponent` no texto inteiro (acentos e quebras de linha).
- Abrir com `window.open(url, "_blank", "noopener")`; se bloqueado, `location.href = url`.
- Depois de enviar, mostrar estado de confirmação: "Pronto! Sua mensagem abriu no WhatsApp.
  Se não abriu, toque aqui." (link direto com a mesma URL).
- Botão flutuante do WhatsApp e CTAs do site usam `buildWhatsAppUrl()` com mensagem curta padrão.
- (Opcional, fase 2) registrar o lead também numa planilha via webhook do n8n antes de abrir o
  WhatsApp — nunca bloquear o envio se o webhook falhar.
