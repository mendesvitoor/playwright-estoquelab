import { test, expect } from "../../fixtures/authenticated.fixture";
import { ProdutoPage } from "../../e2e/produto/produtoPage";

test.describe("Cadastro de produtos - EstoqueLab", () => {
  let produtoPage: ProdutoPage;

  test.beforeEach(async ({ page }) => {
    produtoPage = new ProdutoPage(page);

    await expect(produtoPage.newProductButton).toBeVisible();
  });

  test("PRODUTO-001 - Deve cadastrar um produto físico ativo", async () => {
    const nome = `Produto QA ${Date.now()}`;
    const sku = `QAT${Math.floor(100 + Math.random() * 900)}`;

    await produtoPage.acessarCadastro();

    await produtoPage.preencherDadosGerais(
      nome,
      sku,
      "Eletrônicos",
      "fisico",
      true,
    );

    await produtoPage.preencherDadosPrecoEstoque(
      "199.90",
      "50",
      "5",
      "2027-12-31",
    );

    await produtoPage.salvarProduto();

    await expect(produtoPage.successToast).toBeVisible();
  });
});