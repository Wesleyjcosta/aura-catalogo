# Q0.1 — Esteira de Qualidade

Esta etapa não altera o visual do site.

Adiciona:
- Biome para lint dos módulos AURA;
- TypeScript check explícito;
- testes unitários com Bun;
- Playwright/Chromium para E2E;
- contrato leve de arquitetura;
- verificação básica de segredos;
- budget de assets;
- workflow de Quality Gate no GitHub;
- template de Pull Request;
- documentação do fluxo branch -> PR -> checks -> main.

Importante: o `bun.lock` existente não foi regenerado neste ambiente. O workflow usa `bun install` (não frozen) no bootstrap. Após a primeira instalação em um ambiente com Bun e internet, o lockfile deve ser atualizado e commitado em PR próprio para tornar a instalação totalmente reproduzível.
