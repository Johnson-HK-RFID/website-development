import sharp from "sharp";
import { stat } from "node:fs/promises";
await sharp("public/images/built-world-concept.png").resize({ width:1536, withoutEnlargement:true }).webp({ quality:82 }).toFile("public/images/built-world-concept.webp");
console.log(`Optimized hero: ${(await stat("public/images/built-world-concept.webp")).size} bytes`);
