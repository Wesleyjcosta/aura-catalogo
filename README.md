# Aura Showcase (36)

Crie uma segunda vitrine web independente para a loja AURA — Joias & Acessórios, SEM alterar nenhum projeto existente. Esta nova versão deve ser inspirada na experiência do catálogo Yang House usado como referência pelo usuário, principalmente na sacola/carrinho, mas mantendo identidade visual premium de joalheria.

REFERÊNCIA DE UX
- Link de referência: https://yang-house-control-tau.vercel.app/v7/1332a43681974b24b814b14e28ad565d
- O usuário aprovou no Yang House: header simples com sacola e contador; categorias em chips; busca grande; grade limpa; cards com foto, categoria, nome, preço e botão Ver detalhes; barra flutuante inferior mostrando sacola/quantidade/total; sacola integrada ao catálogo sem parecer um checkout separado; finalização por WhatsApp.
- Não copie identidade visual do Yang House. Use a estrutura/UX como referência e adapte para joias.

IDENTIDADE AURA
- Visual premium: off-white, branco, preto profundo e dourado champanhe com uso moderado.
- Tipografia elegante e legível.
- Fotografia como protagonista.
- Mobile-first.
- Sem aparência de painel administrativo.

DADOS
Use o Supabase existente, sem criar banco novo:
URL: https://aizxtktxnlhdrmqyiiam.supabase.co
Publishable key: sb_publishable_Wu34cKpAube7_PF4erf2cQ_Sy7ajR8k
Fonte: public.catalogo_publico
Campos: id_publico,codigo,referencia,nome,categoria,material,descricao,preco,preco_promocional,estoque,disponivel,destaque,imagem_url,imagem_thumb_url,atualizado_em.
Nunca usar secret/service role no frontend.
Nunca expor custo, clientes, vendas, usuários ou financeiro.

LAYOUT PRINCIPAL
- Header compacto: logo/texto AURA à esquerda; sacola com contador à direita.
- Chips de categoria em linha horizontal, com Todos ativo em preto.
- Barra de busca grande abaixo.
- Título editorial pequeno: COLEÇÃO / Escolha sua próxima peça.
- Contador de produtos à direita.
- Grade 4 colunas desktop e 2 no celular.
- Cards com imagem grande, categoria pequena, nome, preço e botão preto “Ver detalhes”.
- Para cards use imagem_thumb_url e fallback imagem_url.
- Detalhes usam imagem_url em maior qualidade.

SACOLA — PRIORIDADE MÁXIMA
Quero uma experiência muito próxima à sacola do Yang House, não um checkout genérico.
- Ao adicionar item, mostrar barra flutuante inferior arredondada em dourado champanhe, centralizada, com ícone de sacola, badge de quantidade, texto “SUA SACOLA”, ação “Ver sacola” e total alinhado à direita.
- Essa barra fica visível enquanto houver itens.
- Ao abrir a sacola no celular, use bottom sheet/painel alto com cantos superiores arredondados, fundo claro e overlay suave.
- Cabeçalho: “REVISE SEU PEDIDO” pequeno, “Minha sacola · X peças” grande, botão X circular.
- Ação “Limpar sacola” discreta em vermelho.
- Cada item em card branco arredondado com sombra leve: miniatura à esquerda, nome/código/variação, preço em dourado, controle − quantidade + e ícone de remover.
- Rodapé fixo da sacola com “TOTAL DO PEDIDO”, valor grande, link “Continuar comprando” e botão grande verde “Enviar pedido pelo WhatsApp”.
- A loja confirmará disponibilidade, pagamento e entrega — mostrar esta observação em texto pequeno.
- Persistir sacola em localStorage.
- Quantidade limitada ao estoque.
- Adicionar à sacola não baixa nem reserva estoque.

DETALHES DO PRODUTO
- Modal/bottom sheet com imagem grande, categoria, nome, preço, descrição, material, referência, quantidade e botão “Adicionar à sacola”.
- Esgotados continuam visíveis, mas sem possibilidade de adicionar.

WHATSAPP
- Criar src/config/store.ts com STORE_NAME='AURA' e STORE_WHATSAPP='5531995077660' (número configurado anteriormente no Joias Control, somente dígitos).
- Finalização deve montar mensagem com nome do produto, código, quantidade, valor unitário, subtotal e total; depois campos Nome, Forma de entrega e Observação.

QUALIDADE
- Loading skeletons, estados vazio/erro, acessibilidade, foco, aria labels.
- SEO básico.
- Não criar login, pagamento online ou painel admin.
- Testar build e mobile.
- Usar apenas dados reais do Supabase; sem produtos fictícios.
- Criar como projeto NOVO e independente. Não alterar a vitrine AURA existente.

Entregue versão funcional completa pronta para preview e publicação.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://aura-joias-yang-style.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6e2fbb40-8d53-47e1-a868-275f0c6dbc0f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
