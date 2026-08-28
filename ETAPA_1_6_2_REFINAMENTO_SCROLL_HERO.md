# Etapa 1.6.2 — Refinamento do Scroll Hero

Base analisada: Etapa 1.6.1 / commit ff28ca5.

## Objetivo
Refinar somente a experiência do ProductStory após revisão da gravação real em desktop.

## Ajustes realizados
- Bolsa principal maior no desktop, ocupando melhor a área útil da Hero.
- Zoom mais perceptível, porém ainda sutil, e retorno ao enquadramento inicial.
- Crossfade para o close mais longo e menos brusco.
- Close de detalhe maior dentro do palco visual.
- Callouts maiores, com linhas mais legíveis e permanência um pouco maior.
- Duração do sticky aumentada de forma moderada no desktop para dar mais tempo à narrativa.
- CTA final “Essência que acompanha você / Ver coleção” com maior presença.
- Mobile continua com comportamento simplificado.
- prefers-reduced-motion continua respeitado.

## O que NÃO foi alterado
- Header.
- Busca e categorias.
- Vitrine / carregamento de produtos.
- Footer.
- Supabase / backend.
- Arquitetura do projeto.
- Fotos reais da bolsa.

## Validação após deploy
1. Abrir o site no desktop e rolar do topo até “Ver coleção”.
2. Confirmar que a bolsa ocupa mais espaço sem cortar de forma ruim.
3. Confirmar que o close entra suavemente.
4. Confirmar que os quatro callouts estão legíveis.
5. Confirmar que o CTA aparece antes da transição para o catálogo.
6. Repetir no celular.

Se a experiência estiver aprovada, esta etapa vira a nova base visual antes de qualquer correção separada do catálogo.
