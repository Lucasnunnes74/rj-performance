import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/** O filho "puxa" levemente em direção ao cursor. Só mouse; só transform; desligado com redução de movimento. */
export function Magnetico({
  children,
  forca = 0.22,
  className,
}: {
  children: ReactNode;
  forca?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduzido) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * forca);
        y.set((e.clientY - (r.top + r.height / 2)) * forca);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
