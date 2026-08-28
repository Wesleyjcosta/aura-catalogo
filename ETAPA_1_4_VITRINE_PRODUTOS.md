# Etapa 1.4 — Vitrine de Produtos

Esta etapa altera somente a apresentação e os estados da vitrine. A fonte de dados ainda é a integração atual; a troca para `catalogo.json` ocorrerá em etapa própria.

## O que foi implementado

- cards quadrados com fundo branco e enquadramento `object-contain`;
- miniatura via `imagem_thumb_url`, com fallback já existente para `imagem_url`;
- `loading="lazy"` e `decoding="async"` para imagens;
- skeleton da imagem até o carregamento concluir;
- fallback visual AURA quando a foto não existe ou falha;
- categorias em dourado, preço e preço promocional com hierarquia clara;
- selos `Oferta` e `Esgotado`;
- hover/press sutil e rápido, usando apenas `transform`/`opacity`/shadow;
- skeleton cards estruturais durante o carregamento dos produtos;
- estado vazio e estado de erro refinados;
- botão de retry com estado de progresso;
- `prefers-reduced-motion` global;
- componente `ProductGrid` para centralizar loading/error/empty/success;
- componente `ProductCardSkeleton` reutilizável;
- E2E ampliado para validar card, promoção e estado vazio.

## Motion Principles

Contexto: e-commerce.

- Principal: Jakub Krehel — polimento de produção sutil.
- Secundário: Emil Kowalski — rapidez e contenção.

Decisões: nenhum efeito decorativo contínuo; filtros permanecem instantâneos; cards recebem apenas feedback sutil; imagens materializam por opacity; reduced-motion é respeitado globalmente.

## Branch recomendada

`feature/1-4-vitrine-produtos`

A etapa só deve ir para `main` após todos os checks da Q0.1 passarem.
