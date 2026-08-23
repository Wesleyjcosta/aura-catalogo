import { readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const publicDir = join(root, "public");
const brandDir = join(publicDir, "brand");
const catalogImagesDir = join(publicDir, "catalogo", "imagens");
const errors = [];

function filesRecursive(dir) {
  try {
    return readdirSync(dir).flatMap((name) => {
      const full = join(dir, name);
      const stat = statSync(full);
      return stat.isDirectory() ? filesRecursive(full) : [full];
    });
  } catch {
    return [];
  }
}

for (const file of filesRecursive(brandDir)) {
  const size = statSync(file).size;
  if (size > 300 * 1024) {
    errors.push(`${relative(root, file)} excede 300 KB (${Math.ceil(size / 1024)} KB)`);
  }
}

const hero = join(brandDir, "aura-hero-colecao.webp");
try {
  const size = statSync(hero).size;
  if (size > 200 * 1024) {
    errors.push(`Hero excede 200 KB (${Math.ceil(size / 1024)} KB)`);
  }
} catch {
  // O Hero pode não existir em branches muito antigas.
}

for (const file of filesRecursive(catalogImagesDir)) {
  const extension = extname(file).toLowerCase();
  const size = statSync(file).size;
  if (extension !== ".webp") {
    errors.push(`${relative(root, file)}: imagem de catálogo deve ser WebP`);
  }
  if (size > 500 * 1024) {
    errors.push(`${relative(root, file)} excede 500 KB (${Math.ceil(size / 1024)} KB)`);
  }
}

if (errors.length > 0) {
  console.error("\n❌ Budget de assets excedido:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("✅ Budget básico de assets: OK");
