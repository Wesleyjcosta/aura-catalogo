import { expect, test } from "@playwright/test";

const catalogo = [
  {
    id_publico: "bolsa-1",
    codigo: "JC0100",
    referencia: "REF-BOLSA",
    nome: "Bolsa Elegance Nude",
    categoria: "Bolsas",
    material: "Sintético premium",
    descricao: "Bolsa de teste",
    preco: 195,
    preco_promocional: null,
    estoque: 2,
    disponivel: true,
    destaque: true,
    imagem_url: null,
    imagem_thumb_url: null,
    atualizado_em: "2026-08-22T12:00:00Z",
  },
  {
    id_publico: "colar-1",
    codigo: "JC0200",
    referencia: "REF-COLAR",
    nome: "Colar Dourado AURA",
    categoria: "Colares",
    material: "Metal",
    descricao: "Colar de teste",
    preco: 89.9,
    preco_promocional: 79.9,
    estoque: 4,
    disponivel: true,
    destaque: false,
    imagem_url: null,
    imagem_thumb_url: null,
    atualizado_em: "2026-08-22T12:00:00Z",
  },
];

test.beforeEach(async ({ page }) => {
  await page.route(/\/catalogo\.json(?:\?.*)?$/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(catalogo),
    });
  });
});

test("home, busca e categorias funcionam com catalogo estatico", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Escolha sua próxima peça" }),
  ).toBeVisible();

  await expect(page.getByText("2 peças", { exact: true })).toBeVisible();

  await expect(
    page.getByRole("region", { name: "Explore os detalhes da bolsa AURA" }),
  ).toHaveCount(1);

  const bolsaCard = page
    .getByRole("article")
    .filter({ hasText: "Bolsa Elegance Nude" });

  await expect(bolsaCard).toBeVisible();
  await expect(bolsaCard.getByText(/195,00/)).toBeVisible();

  const colarCard = page
    .getByRole("article")
    .filter({ hasText: "Colar Dourado AURA" });

  await expect(colarCard.getByText("Oferta")).toBeVisible();

  const search = page.getByRole("searchbox", { name: "Buscar produtos" });

  await search.fill("Bolsa");

  await expect(
    page.getByRole("button", { name: "Ver detalhes de Bolsa Elegance Nude" }),
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Ver detalhes de Colar Dourado AURA" }),
  ).toHaveCount(0);

  await search.fill("");

  await page.getByRole("button", { name: "Colares" }).click();

  await expect(
    page.getByRole("button", { name: "Ver detalhes de Colar Dourado AURA" }),
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Ver detalhes de Bolsa Elegance Nude" }),
  ).toHaveCount(0);

  await page.getByRole("button", { name: "Todos" }).click();

  await search.fill("produto inexistente");

  await expect(
    page.getByRole("heading", { name: "Nenhuma peça encontrada" }),
  ).toBeVisible();
});
