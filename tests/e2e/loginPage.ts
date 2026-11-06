import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly chkLembrarUsuario: Locator;
  readonly msgErroLogin: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByTestId("login-usuario");
    this.passwordInput = page.getByTestId("login-senha");
    this.loginButton = page.getByTestId("login-button");
    this.chkLembrarUsuario = page.locator('label[name="lblLembrarUsuario"]');
    this.msgErroLogin = page.locator('div[name="msgErroLogin"]');
  }

  async acessar(): Promise<void> {
    await this.page.goto("/");
  }

  async realizarLogin(
    usuario: string,
    senha: string,
    manterConectado: boolean = false,
  ): Promise<void> {
    await this.usernameInput.fill(usuario);
    await this.passwordInput.fill(senha);

    if (manterConectado) {
      await this.chkLembrarUsuario.check();
    }

    await this.loginButton.click();
  }

  async marcarManterConectado(): Promise<void> {
    await this.chkLembrarUsuario.check();
  }
}
