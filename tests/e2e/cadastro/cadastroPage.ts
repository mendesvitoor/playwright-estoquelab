import { Page, Locator } from "@playwright/test";

export class CadastroPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByTestId("register-username");
    this.passwordInput = page.getByTestId("register-password");
    this.registerButton = page.getByTestId("register-button");
    this.successToast = page.getByText("Usuário cadastrado com sucesso!", {
      exact: true,
    });
  }

  async realizarCadastro(usuario: string, senha: string): Promise<void> {
    await this.usernameInput.fill(usuario);
    await this.passwordInput.fill(senha);
    await this.registerButton.click();
  }
}