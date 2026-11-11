import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../e2e/login/loginPage";

export const test = base.extend({
  page: async ({ page }, use) => {
    const usuario = process.env.E2E_USERNAME;
    const senha = process.env.E2E_PASSWORD;

    if (!usuario || !senha) {
      throw new Error("Configure E2E_USERNAME e E2E_PASSWORD.");
    }

    const loginPage = new LoginPage(page);

    await loginPage.acessar();
    await loginPage.realizarLogin(usuario, senha);

    await expect(loginPage.successLoginToast).toBeVisible();

    await use(page);
  },
});

export { expect };
