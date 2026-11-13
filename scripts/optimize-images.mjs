// Uso: npm run images  (package.json → "images": "node scripts/optimize-images.mjs")
// Requer: npm i -D sharp
import { readdirSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const ORIG = path.join(root, "assets-originais");
const FOTOS = path.join(root, "public/images/fotos");
const INSTA_IN = path.join(ORIG, "instagram");
const INSTA_OUT = path.join(root, "public/images/instagram");
const isImg = (f) => /\.(jpe?g|png|webp)$/i.test(f);

mkdirSync(FOTOS, { recursive: true });
mkdirSync(INSTA_OUT, { recursive: true });

for (const f of readdirSync(ORIG).filter(isImg)) {
  const nome = f.replace(/\.[^.]+$/, "");
  for (const w of [640, 1200]) {
    const out = path.join(FOTOS, `${nome}-${w}.webp`);
    if (existsSync(out)) continue;
    await sharp(path.join(ORIG, f)).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    console.log("ok", path.relative(root, out));
  }
}

if (existsSync(INSTA_IN)) {
  for (const f of readdirSync(INSTA_IN).filter(isImg)) {
    const id = f.replace(/\.[^.]+$/, "");
    const out = path.join(INSTA_OUT, `${id}.webp`);
    if (existsSync(out)) continue;
    await sharp(path.join(INSTA_IN, f)).rotate().resize(480, 600, { fit: "cover", position: "attention" }).webp({ quality: 78 }).toFile(out);
    console.log("ok", path.relative(root, out));
  }
}
