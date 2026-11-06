import { test, expect } from "@playwright/test";
import { LoginPage } from "../tests/e2e/loginPage";

test.describe("Autenticação - EstoqueLab", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.acessar();
  });

  test("LOGIN-001 - Deve acessar a tela de login", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Entrar no EstoqueLab",
      }),
    ).toBeVisible();

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("LOGIN-002 - Deve realizar login com credenciais válidas", async ({
    page,
  }) => {
    await loginPage.realizarLogin("admin", "123456");

    await expect(page.getByRole("button", { name: /admin/i })).toBeVisible();
  });

  test("LOGIN-003 - Não deve realizar login com credenciais inválidas", async () => {
    await loginPage.realizarLogin("usuarioInvalido", "senhaInvalida");

    await expect(loginPage.msgErroLogin).toBeVisible();
    await expect(loginPage.msgErroLogin).toHaveText(
      "Usuário ou senha inválidos.",
    );
  });

  test("LOGIN-004 - Deve realizar login mantendo o usuário conectado", async ({
    page,
  }) => {
    await loginPage.realizarLogin("admin", "123456", true);

    await expect(loginPage.chkLembrarUsuario).toBeChecked();
    await expect(page.getByRole("button", { name: /admin/i })).toBeVisible();
  });
});
