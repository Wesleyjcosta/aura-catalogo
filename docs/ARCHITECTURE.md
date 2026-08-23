# Arquitetura AURA — princípios

## Fonte da verdade

O JOIAS CONTROL é a fonte oficial de produtos. O catálogo web é uma publicação/snapshot para clientes, não um segundo sistema mestre.

## Separação

- **Frontend público:** leitura, busca, filtros, detalhes, sacola e WhatsApp.
- **Publicador AURA:** processo separado, executado na loja, responsável por publicar o snapshot.
- **Credenciais de escrita:** nunca entram no bundle público.

## Dependências internas

- `routes` compõem páginas.
- `components/aura` implementam experiência da loja e podem reutilizar `components/ui`.
- `lib` contém regras/funções e não depende da UI.
- `config` contém configuração e não depende de páginas/componentes.

## Regras de engenharia

- Reutilizar componentes existentes antes de criar outro equivalente.
- DRY com critério: duplicação pequena é preferível a abstração prematura ruim.
- Evitar bibliotecas/serviços quando o problema pode ser resolvido de forma simples e estável.
- Lazy loading e miniaturas para mídia quando aplicável.
- Motion deve ter propósito, ser sutil e respeitar `prefers-reduced-motion`.
