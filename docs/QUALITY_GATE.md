# Q0.1 — Esteira de Qualidade AURA

## Objetivo

Impedir que uma alteração com erro de TypeScript, lint, regra básica, arquitetura, segurança, assets ou E2E seja considerada pronta para entrar na `main`.

## Fluxo oficial

1. Criar uma branch (`feature/...`, `fix/...` ou `chore/...`).
2. Fazer a alteração.
3. Push da branch.
4. Abrir Pull Request para `main`.
5. Aguardar os checks **Code, tests and build** e **E2E Chromium** ficarem verdes.
6. Revisar a alteração.
7. Só então fazer merge.

Após o primeiro PR desta Q0.1 ser aprovado, ativar proteção da branch `main` exigindo os checks do workflow `Quality Gate`.

## Comandos

- `bun run typecheck` — TypeScript estrito.
- `bun run lint` — Biome nos módulos mantidos pela AURA.
- `bun run test:unit` — testes unitários com Bun.
- `bun run quality:architecture` — dependências entre camadas.
- `bun run quality:security` — busca básica por segredos acidentalmente commitados.
- `bun run quality:assets` — budget de imagens e assets.
- `bun run build` — build de produção.
- `bun run test:e2e` — fluxo real no navegador com Playwright/Chromium.
- `bun run check` — executa o gate principal completo, exceto o E2E.

## Escopo intencional da Q0.1

Incluído agora: Biome, TypeScript, testes unitários, Playwright, contrato de arquitetura leve, varredura básica de segredos, budget de assets e GitHub Actions.

Adiado para quando houver necessidade real: Sentry, Codecov, Knip bloqueante, Commitlint bloqueante, mutation testing/Stryker, Datadog, New Relic e OpenTelemetry.

Isso evita overengineering sem abrir mão do gate essencial.

## Arquitetura do produto

A esteira não muda a estratégia do catálogo:

`JOIAS CONTROL -> snapshot JSON + WebP -> Publicador AURA em Python -> Git/GitHub -> hospedagem -> site público`

O site público permanece separado do publicador e não deve possuir credenciais administrativas.
