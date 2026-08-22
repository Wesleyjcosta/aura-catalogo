# AURA — Etapa 1.2: Hero editável

Esta etapa adiciona somente o banner principal (Hero) logo abaixo do Top Header aprovado na Etapa 1.1.

## O que foi incluído

- Hero premium responsivo para desktop e celular.
- Foto WebP otimizada em `public/brand/aura-hero-colecao.webp`.
- Título, destaque, subtítulo, imagem e botões centralizados em `src/config/hero.ts`.
- Botão "Ver coleção" leva para a coleção da página.
- Botão "Falar no WhatsApp" abre o WhatsApp da AURA.
- O número oficial de WhatsApp no `src/config/store.ts` foi alinhado ao cadastro da loja.

## Como trocar o conteúdo no futuro

Edite somente `src/config/hero.ts` para alterar textos, imagem e botões.
Para trocar a foto sem alterar código, substitua `public/brand/aura-hero-colecao.webp` por outra imagem WebP mantendo o mesmo nome.

## Arquivos alterados/adicionados

- `src/routes/index.tsx`
- `src/config/store.ts`
- `src/config/hero.ts`
- `src/components/aura/HeroSection.tsx`
- `public/brand/aura-hero-colecao.webp`
