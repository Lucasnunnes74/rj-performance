import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  /** Caminho da versão de 1200px (ex.: /images/fotos/rj-sorrindo-1200.webp). A de 640px é derivada. */
  src: string;
  alt: string;
  width: number;
  height: number;
  prioridade?: boolean;
};

/** Foto inteira, sem máscara, sombra ou brilho: só srcSet, dimensões e carregamento corretos. */
export function Foto({
  src,
  alt,
  width,
  height,
  prioridade = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  ...rest
}: Props) {
  const pequena = src.replace("-1200.webp", "-640.webp");
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      srcSet={`${pequena} 640w, ${src} 1200w`}
      sizes={sizes}
      loading={prioridade ? "eager" : "lazy"}
      fetchPriority={prioridade ? "high" : undefined}
      decoding="async"
      {...rest}
    />
  );
}
