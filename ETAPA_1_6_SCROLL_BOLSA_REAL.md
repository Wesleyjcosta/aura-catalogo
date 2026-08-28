# Etapa 1.6 — Scroll interativo com fotos reais da bolsa

Objetivo: substituir o protótipo anterior de “Descubra os detalhes” por uma experiência editorial controlada pela rolagem, inspirada no reel de joia apresentado como referência.

## Sequência
1. Bolsa inteira em destaque.
2. Scroll aproxima a peça suavemente.
3. Transição para o close real da bolsa.
4. Entram callouts: Alça, Acabamento, Estrutura e Detalhes dourados.
5. Callouts desaparecem.
6. Bolsa volta ao enquadramento principal.
7. CTA final: “Essência que acompanha você” + “Ver coleção”.

## Direção visual
- Fundo estrutural branco.
- Dourado apenas como acento.
- Fotos reais da peça; nenhum produto gerado por IA.
- Tratamento de imagem feito no navegador apenas para reduzir saturação/temperatura visual excessiva; a cor real da bolsa é preservada.
- Motion concentrado em transform e opacity.
- Sem animações decorativas em loop.
- `prefers-reduced-motion` mantém experiência acessível e estática.

## Assets
- `aura-bolsa-scroll-principal.webp`: foto principal enviada pelo usuário.
- `aura-bolsa-scroll-detalhe.webp`: close real de corrente, ilhó e costura.
- `aura-bolsa-lifestyle-frente.webp`: foto de apoio para uso posterior.
- `aura-bolsa-lifestyle-ombro.webp`: foto de apoio para uso posterior.

As duas fotos lifestyle são mantidas no pacote para as próximas etapas de detalhe do produto/campanha, sem poluir a experiência de scroll atual.
