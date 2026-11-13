// TODO o texto do site. Fonte: docs/BRIEFING.md (formulário respondido pelo cliente em 12/11/2026).
// Regra: campo null = dado que o cliente ainda não passou → o componente esconde o bloco.
// Itens com `validar: true` são rascunhos da LivON que o Rosinaldo precisa aprovar.

export const contato = {
  nomeCompleto: "Rosinaldo Francisco da Silva Júnior",
  nomeCurto: "Rosinaldo Jr.",
  marca: "RJ Performance",
  whatsappE164: "5511949083103",
  whatsappExibicao: "(11) 94908-3103",
  email: "rosinaldojr13@gmail.com",
  instagram: "https://www.instagram.com/rjperformance.oficial/",
  cidade: "Itapevi – SP",
  cref: null as string | null, // ex.: "CREF 000000-G/SP" — pendente
  endereco: null as string | null, // pendente
  horario: null as string | null, // pendente
  atendeOnline: null as boolean | null, // pendente
};

export const lema = ["Disciplina", "Evolução", "Propósito"] as const;

export const conteudo = {
  hero: {
    palavraGigante: "Performance", // decorativa (aria-hidden), renderizada em display-largo
    titulo: "Personal trainer e preparação física em Itapevi",
    subtitulo:
      "Treino planejado para atletas e para quem quer mais força, saúde e condicionamento. Com avaliação, acompanhamento e ajuste a cada fase.",
    ctaPrincipal: "Agendar avaliação pelo WhatsApp",
    ctaSecundario: "Ver o treino no Instagram",
    imagem: {
      src: "/images/fotos/rj-serio-bracos-cruzados-2-1200.webp",
      alt: "Rosinaldo Jr. de braços cruzados, vestindo a camiseta preta da RJ Performance",
      width: 1200,
      height: 1505,
    },
  },

  pilares: {
    titulo: "O que guia cada treino",
    itens: [
      {
        nome: "Disciplina",
        texto:
          "Dedicação e compromisso em cada sessão. Você sabe o que vai fazer, por que vai fazer e tem acompanhamento do começo ao fim.",
      },
      {
        nome: "Evolução",
        texto:
          "Metodologia focada em resultado e qualidade de vida: avaliação física, metas claras e ajustes conforme você avança.",
      },
      {
        nome: "Propósito",
        texto:
          "Ajudar você a superar os próprios limites e chegar à sua melhor versão, respeitando sua individualidade e seus objetivos.",
      },
    ],
  },

  sobre: {
    titulo: "Rosinaldo Jr.",
    texto: [
      "Sou profissional de Educação Física e personal trainer em Itapevi. Acompanho e oriento atletas e pessoas que querem treinar melhor, sempre respeitando o objetivo e a necessidade de cada um.",
      "Meu trabalho une conhecimento técnico, experiência com atletas e com o público em geral e uma metodologia focada em resultado, evolução e qualidade de vida.",
    ],
    anosExperiencia: null as number | null, // pendente
    formacao: null as string | null, // pendente
    imagem: {
      src: "/images/fotos/rj-perfil-bracos-cruzados-1200.webp",
      alt: "Rosinaldo Jr. de perfil, olhando para frente, com a camiseta da RJ Performance",
      width: 1200,
      height: 1600,
    },
  },

  servicos: {
    titulo: "Como posso te ajudar",
    grupos: [
      {
        nome: "Performance esportiva",
        itens: [
          {
            nome: "Preparação física para atletas",
            descricao: "Planejamento de temporada e treino específico para a demanda do seu esporte.",
          },
          {
            nome: "Velocidade e explosão muscular",
            descricao: "Arranque, aceleração e potência para chegar antes e saltar mais alto.",
          },
          {
            nome: "Força e resistência",
            descricao: "Base de força para render mais e sustentar o esforço até o fim.",
          },
        ],
      },
      {
        nome: "Corpo e saúde",
        itens: [
          {
            nome: "Hipertrofia e emagrecimento",
            descricao: "Treino de força ajustado ao seu objetivo de composição corporal.",
          },
          {
            nome: "Condicionamento físico",
            descricao: "Mais fôlego e disposição para o treino e para o dia a dia.",
          },
          {
            nome: "Treinamento funcional",
            descricao: "Movimentos do dia a dia com mais força, equilíbrio e coordenação.",
          },
        ],
      },
      {
        nome: "Base do treino",
        itens: [
          {
            nome: "Treinamento personalizado",
            descricao: "Cada sessão montada para você, com acompanhamento de perto.",
          },
          {
            nome: "Avaliação física e acompanhamento",
            descricao: "Ponto de partida medido e reavaliações para mostrar sua evolução.",
          },
          {
            nome: "Mobilidade, flexibilidade e core",
            descricao: "Corpo que se move melhor, protege as articulações e transfere força.",
          },
        ],
      },
    ],
  },

  paraQuem: {
    titulo: "Treino para quem compete e para quem quer viver melhor",
    opcoes: {
      atleta: {
        rotulo: "Sou atleta",
        titulo: "Para atletas",
        texto:
          "Preparação física voltada para o seu esporte: velocidade, explosão, força e resistência, com treinos que conversam com a sua rotina de jogos e competições.",
        objetivoPadrao: "Performance esportiva",
        momentoPadrao: "Sou atleta",
        imagem: "/images/fotos/rj-costas-logo-vertical-1200.webp",
      },
      geral: {
        rotulo: "Quero treinar",
        titulo: "Para quem quer resultado e saúde",
        texto:
          "Seja para ganhar massa, emagrecer, ter mais disposição ou começar do zero com segurança: o treino parte de uma avaliação e acompanha o seu ritmo.",
        objetivoPadrao: "",
        momentoPadrao: "",
        imagem: "/images/fotos/rj-sorrindo-bracos-cruzados-1200.webp",
      },
    },
  },

  metodo: {
    titulo: "Como funciona",
    validar: true,
    passos: [
      {
        nome: "Avaliação física",
        texto: "Medimos seu ponto de partida e conversamos sobre objetivo, histórico e rotina.",
      },
      {
        nome: "Planejamento",
        texto: "Você recebe um plano de treino pensado para o seu objetivo e o seu nível.",
      },
      {
        nome: "Treino acompanhado",
        texto: "Execução orientada de perto, com correção e progressão de carga.",
      },
      { nome: "Reavaliação", texto: "Comparamos os números, ajustamos o plano e definimos o próximo passo." },
    ],
  },

  noTreino: {
    titulo: "Veja como é o treino",
    texto: "Treinos, avaliações e bastidores direto do Instagram.",
    cta: "Seguir @rjperformance.oficial",
  },

  depoimentos: {
    titulo: "Quem treina comigo",
    itens: [] as { nome: string; texto: string; contexto?: string }[], // vazio = seção escondida
  },

  faq: {
    titulo: "Perguntas frequentes",
    validar: true,
    itens: [
      {
        pergunta: "Preciso já treinar para começar?",
        resposta:
          "Não. O treino parte de uma avaliação e é ajustado ao seu nível, seja você iniciante ou atleta.",
      },
      {
        pergunta: "Como é o primeiro encontro?",
        resposta:
          "Começamos pela avaliação física e por uma conversa sobre seu objetivo e sua rotina. A partir disso, monto o seu plano.",
      },
      { pergunta: "Você trabalha com atletas de qual esporte?", resposta: null as string | null }, // pendente
      { pergunta: "Onde são os treinos?", resposta: null as string | null }, // pendente (academia, domicílio, ao ar livre?)
      { pergunta: "Tem atendimento online?", resposta: null as string | null }, // pendente
      {
        pergunta: "Quanto custa?",
        resposta:
          "Os valores dependem da frequência e do formato do acompanhamento. Me chama no WhatsApp que eu te explico as opções.",
      },
    ],
  },

  formulario: {
    titulo: "Monte seu ponto de partida",
    texto: "Quatro perguntas rápidas. No final, sua mensagem abre pronta no meu WhatsApp.",
    etapas: {
      objetivo: {
        pergunta: "Qual é o seu objetivo?",
        opcoes: [
          "Performance esportiva",
          "Hipertrofia",
          "Emagrecimento",
          "Condicionamento físico",
          "Mobilidade e core",
          "Ainda não sei",
        ],
      },
      momento: {
        pergunta: "Como está seu treino hoje?",
        opcoes: ["Nunca treinei", "Treino às vezes", "Treino com frequência", "Sou atleta"],
        perguntaModalidade: "Qual a sua modalidade?",
      },
      horarios: {
        pergunta: "Quando você pode treinar?",
        opcoes: ["Manhã", "Tarde", "Noite", "Fim de semana"],
      },
      dados: {
        pergunta: "Para eu te responder",
        nome: "Seu nome",
        whatsapp: "Seu WhatsApp com DDD",
        mensagem: "Alguma dúvida ou observação? (opcional)",
      },
      resumo: { titulo: "Seu pedido", editar: "Editar" },
    },
    botoes: {
      proximo: "Continuar",
      voltar: "Voltar",
      montar: "Montar meu pedido",
      enviar: "Enviar no WhatsApp",
    },
    confirmacao: "Pronto! Sua mensagem abriu no WhatsApp. Se não abriu, toque aqui.",
  },

  rodape: {
    texto: "Personal trainer e preparação física em Itapevi – SP.",
    direitos: "RJ Performance. Todos os direitos reservados.",
    creditos: "Site por LivON",
  },
} as const;

export const navegacao = [
  { rotulo: "Sobre", href: "#sobre" },
  { rotulo: "Serviços", href: "#servicos" },
  { rotulo: "Método", href: "#metodo" },
  { rotulo: "No treino", href: "#no-treino" },
  { rotulo: "Perguntas", href: "#faq" },
  { rotulo: "Contato", href: "#contato" },
] as const;

export const ui = {
  navCta: "WhatsApp",
  fecharModal: "Fechar",
  carrossel: "Reels do Instagram",
  abrirMenu: "Abrir menu",
  fecharMenu: "Fechar menu",
  anterior: "Reel anterior",
  proximo: "Próximo reel",
  irPara: "Ir para o reel",
  abrirPost: "Abrir",
  verReel: "Assistir reel",
  verPost: "Ver post",
  botaoFlutuante: "Conversar com Rosinaldo no WhatsApp",
  montarPedido: "Montar meu pedido",
  crefRotulo: "CREF",
  experienciaRotulo: "anos de experiência",
  formacaoRotulo: "Formação",
  passoRotulo: "Passo",
  etapaRotulo: "Etapa",
  de: "de",
  logoAlt: "RJ Performance, logo oficial: Disciplina, Evolução, Propósito",
  imagens: {
    costas: "Rosinaldo Jr. de costas, com a logo da RJ Performance estampada na camiseta",
    sorrindo: "Rosinaldo Jr. sorrindo, de braços cruzados, com a camiseta da RJ Performance",
  },
  contatoFrase: "Vamos começar pela sua avaliação. Eu respondo pessoalmente.",
  rodapeContatos: "Contato",
} as const;
