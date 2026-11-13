// Posts/reels exibidos na seção "No treino". Como adicionar: skill instagram-showcase.
// Preencha com 6 a 8 posts que mostram como o Rosinaldo trabalha (os de exemplo abaixo são modelo).

export type PostInstagram = {
  id: string; // trecho do link depois de /p/ ou /reel/
  tipo: "reel" | "post";
  url: string;
  thumb?: string; // /images/instagram/<id>.webp (gerado por npm run images)
  legenda: string; // curta e descritiva; vira o alt da imagem
};

export const perfilInstagram = {
  usuario: "rjperformance.oficial",
  url: "https://www.instagram.com/rjperformance.oficial/",
};

/**
 * Feed automático (Behold): cole aqui a URL do feed, ex.: "https://feeds.behold.so/XXXXXXXX".
 * Vazio = usa só a lista manual abaixo. A URL é pública por desenho (não é segredo).
 */
export const feedInstagramUrl = "";

export const postsInstagram: PostInstagram[] = [
  {
    id: "DeSVxDgNDSA",
    tipo: "post",
    url: "https://www.instagram.com/p/DeSVxDgNDSA/",
    legenda: "Treino 01",
  },
  {
    id: "DfPjACZtXs4",
    tipo: "reel",
    url: "https://www.instagram.com/reel/DfPjACZtXs4/",
    legenda: "Treino 02",
  },
  {
    id: "DeuF-_ott3W",
    tipo: "reel",
    url: "https://www.instagram.com/reel/DeuF-_ott3W/",
    legenda: "Treino 03",
  },
  {
    id: "DehP7bwNVYI",
    tipo: "reel",
    url: "https://www.instagram.com/reel/DehP7bwNVYI/",
    legenda: "Treino 04",
  },
  {
    id: "DeZrFYONH1d",
    tipo: "reel",
    url: "https://www.instagram.com/reel/DeZrFYONH1d/",
    legenda: "Treino 05",
  },
  {
    id: "Dd9N-gtN6k5",
    tipo: "reel",
    url: "https://www.instagram.com/reel/Dd9N-gtN6k5/",
    legenda: "Treino 06",
  },
  {
    id: "DeNMjFVt1zE",
    tipo: "reel",
    url: "https://www.instagram.com/reel/DeNMjFVt1zE/",
    legenda: "Treino 07",
  },
  {
    id: "DeHnI7ZtwP8",
    tipo: "reel",
    url: "https://www.instagram.com/reel/DeHnI7ZtwP8/",
    legenda: "Treino 08",
  },
];

/** URL do embed oficial (permalink + /embed), carregada só quando o modal abre */
export const urlEmbed = (p: PostInstagram) => `${p.url.replace(/\/?$/, "/")}embed`;
