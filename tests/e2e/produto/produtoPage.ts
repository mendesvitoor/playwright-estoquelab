import { Page, Locator } from "@playwright/test";

export class ProdutoPage {
  readonly page: Page;

  readonly newProductButton: Locator;
  readonly productNameInput: Locator;
  readonly productSkuInput: Locator;
  readonly productCategorySelect: Locator;
  readonly supplierSelect: Locator;
  readonly productDescriptionInput: Locator;
  readonly productImageButton: Locator;

  readonly priceTabButton: Locator;
  readonly productPriceInput: Locator;
  readonly productStockInput: Locator;
  readonly productMinStockInput: Locator;
  readonly productExpiryInput: Locator;

  readonly productTypePhysical: Locator;
  readonly productTypeDigital: Locator;
  readonly productActiveCheckbox: Locator;

  readonly saveProductButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;

    this.newProductButton = page.getByTestId("new-product");
    this.productNameInput = page.getByTestId("product-name");
    this.productSkuInput = page.getByTestId("product-sku");
    this.productCategorySelect = page.getByTestId("product-category");

    this.supplierSelect = page.locator('[name="selFornecedorProduto"]');

    this.productDescriptionInput = page.getByTestId("product-description");

    this.productImageButton = page.getByTestId("product-image");

    this.priceTabButton = page.locator('[name="abaEstoquePrecoProduto"]');

    this.productPriceInput = page.getByTestId("product-price");
    this.productStockInput = page.getByTestId("product-stock");
    this.productMinStockInput = page.getByTestId("product-min-stock");
    this.productExpiryInput = page.getByTestId("product-expiry");

    this.productTypePhysical = page.locator(
      'label[name="lblTipoProdutoFisico"]',
    );

    this.productTypeDigital = page.locator(
      'label[name="lblTipoProdutoDigital"]',
    );

    this.productActiveCheckbox = page.getByTestId("product-active");

    this.saveProductButton = page.getByTestId("save-product");

    this.successToast = page.getByText("Produto cadastrado com sucesso!", {
      exact: true,
    });
  }

  async acessarCadastro(): Promise<void> {
    await this.newProductButton.click();
  }

  async selecionarCategoria(categoria: string): Promise<void> {
    await this.productCategorySelect.selectOption({
      label: categoria,
    });
  }

  async selecionarFornecedor(fornecedor: string): Promise<void> {
    await this.supplierSelect.selectOption({ label: fornecedor });
  }

  async selecionarTipo(tipo: "fisico" | "digital"): Promise<void> {
    if (tipo === "fisico") {
      await this.productTypePhysical.click();
    } else {
      await this.productTypeDigital.click();
    }
  }

  async preencherDadosGerais(
    nome: string,
    sku: string,
    categoria:
      | "Eletrônicos"
      | "Livros"
      | "Roupas"
      | "Alimentos",
    tipo: "fisico" | "digital",
    ativo: boolean = true,
  ): Promise<void> {
    await this.productNameInput.fill(nome);
    await this.productSkuInput.fill(sku);
    await this.selecionarCategoria(categoria);
    await this.selecionarTipo(tipo);

    if (ativo) {
      await this.productActiveCheckbox.check();
    } else {
      await this.productActiveCheckbox.uncheck();
    }
  }

  async acessarAbaPrecoEstoque(): Promise<void> {
    await this.priceTabButton.click();
  }

  async preencherDadosPrecoEstoque(
    preco: string,
    estoque: string,
    estoqueMinimo: string,
    validade: string,
  ): Promise<void> {
    await this.acessarAbaPrecoEstoque();

    await this.productPriceInput.fill(preco);
    await this.productStockInput.fill(estoque);
    await this.productMinStockInput.fill(estoqueMinimo);
    await this.productExpiryInput.fill(validade);
  }

  async salvarProduto(): Promise<void> {
    await this.saveProductButton.click();
  }
}
