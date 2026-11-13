import { useEffect, useState } from "react";
import { feedInstagramUrl, postsInstagram, type PostInstagram } from "@/content/instagram";

type PostBehold = {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  isReel?: boolean;
  prunedCaption?: string;
  caption?: string;
  sizes?: { medium?: { mediaUrl: string }; small?: { mediaUrl: string } };
  thumbnailUrl?: string;
};

const MAX_REELS = 8;

function legenda(p: PostBehold) {
  const texto = (p.prunedCaption || p.caption || "").replace(/\s+/g, " ").trim();
  if (!texto) return "Reel do Rosinaldo Jr. no Instagram";
  return texto.length > 110 ? `${texto.slice(0, 107)}...` : texto;
}

/**
 * Reels do Instagram. Com `feedInstagramUrl` preenchido, lê o feed público do Behold
 * (só reels, mais recentes primeiro). Se não houver feed ou a leitura falhar,
 * usa a lista manual de src/content/instagram.ts.
 */
export function useReelsInstagram(): PostInstagram[] {
  const [posts, setPosts] = useState<PostInstagram[]>(postsInstagram);

  useEffect(() => {
    if (!feedInstagramUrl) return;
    const ctrl = new AbortController();
    fetch(feedInstagramUrl, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((dados: { posts?: PostBehold[] }) => {
        const reels = (dados.posts ?? [])
          .filter((p) => p.mediaType === "VIDEO" && p.isReel)
          .slice(0, MAX_REELS)
          .map<PostInstagram>((p) => ({
            id: p.id,
            tipo: "reel",
            url: p.permalink,
            thumb: p.sizes?.medium?.mediaUrl ?? p.sizes?.small?.mediaUrl ?? p.thumbnailUrl ?? "",
            legenda: legenda(p),
          }))
          .filter((p) => p.thumb);
        if (reels.length > 0) setPosts(reels);
      })
      .catch(() => {
        /* mantém a lista manual */
      });
    return () => ctrl.abort();
  }, []);

  return posts;
}
