import type { ElementType, ReactNode } from "react";

type Props = { children: ReactNode; className?: string; as?: ElementType };

export function Container({ children, className = "", as: Tag = "div" }: Props) {
  return <Tag className={`mx-auto w-full max-w-site px-5 md:px-8 ${className}`}>{children}</Tag>;
}
