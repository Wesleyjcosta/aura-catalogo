import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, normalize, relative, resolve, sep } from "node:path";

const root = process.cwd();
const srcRoot = join(root, "src");
const violations = [];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) return walk(full);
    if (!/\.(ts|tsx)$/.test(name) || name === "routeTree.gen.ts") return [];
    return [full];
  });
}

function layer(file) {
  const rel = relative(srcRoot, file).split(sep);
  if (rel[0] === "components" && rel[1] === "aura") return "aura-component";
  return rel[0] ?? "unknown";
}

function resolveInternal(fromFile, specifier) {
  if (specifier.startsWith("@/")) {
    return normalize(join(srcRoot, specifier.slice(2)));
  }
  if (specifier.startsWith(".")) {
    return normalize(resolve(dirname(fromFile), specifier));
  }
  return null;
}

function targetLayer(target) {
  const rel = relative(srcRoot, target).split(sep);
  if (rel[0] === "components" && rel[1] === "aura") return "aura-component";
  return rel[0] ?? "unknown";
}

const forbidden = new Map([
  ["config", new Set(["components", "aura-component", "routes", "server"])],
  ["lib", new Set(["components", "aura-component", "routes", "server"])],
  ["aura-component", new Set(["routes", "server"])],
]);

const importPattern = /(?:import|export)\s+(?:[^'";]*?\sfrom\s*)?["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g;

for (const file of walk(srcRoot)) {
  const sourceLayer = layer(file);
  const blocked = forbidden.get(sourceLayer);
  if (!blocked) continue;

  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(importPattern)) {
    const specifier = match[1] ?? match[2];
    if (!specifier) continue;
    const target = resolveInternal(file, specifier);
    if (!target) continue;
    const destinationLayer = targetLayer(target);
    if (blocked.has(destinationLayer)) {
      violations.push(
        `${relative(root, file)} -> ${specifier} (${sourceLayer} não pode depender de ${destinationLayer})`,
      );
    }
  }
}

if (violations.length > 0) {
  console.error("\n❌ Contrato de arquitetura violado:\n");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log("✅ Contrato de arquitetura: OK");
