import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const roots = ["src", "scripts", ".github"];
const allowedExtensions = /\.(ts|tsx|js|mjs|cjs|json|yml|yaml)$/;
const findings = [];

const patterns = [
  { name: "GitHub token clássico", regex: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/g },
  { name: "GitHub fine-grained PAT", regex: /\bgithub_pat_[A-Za-z0-9_]{20,}\b/g },
  { name: "chave privada", regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g },
  { name: "AWS access key", regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { name: "Supabase service role", regex: /\b(?:SUPABASE_)?SERVICE_ROLE(?:_KEY)?\b\s*[:=]\s*["'][^"']{12,}["']/gi },
  { name: "segredo literal", regex: /\b(?:SECRET|PRIVATE_KEY|PASSWORD)\b\s*[:=]\s*["'][^"']{12,}["']/gi },
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) return walk(full);
    if (!allowedExtensions.test(name)) return [];
    return [full];
  });
}

for (const base of roots) {
  let files = [];
  try {
    files = walk(join(root, base));
  } catch {
    continue;
  }

  for (const file of files) {
    const text = readFileSync(file, "utf8");
    for (const pattern of patterns) {
      if (pattern.regex.test(text)) {
        findings.push(`${relative(root, file)}: ${pattern.name}`);
      }
      pattern.regex.lastIndex = 0;
    }
  }
}

if (findings.length > 0) {
  console.error("\n❌ Possíveis segredos encontrados no código:\n");
  for (const finding of findings) console.error(`- ${finding}`);
  console.error("\nUse variáveis de ambiente/credenciais do sistema; nunca publique segredos no frontend.");
  process.exit(1);
}

console.log("✅ Verificação básica de segredos: OK");
