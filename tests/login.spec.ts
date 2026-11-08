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

  test("LOGIN-005 - Não deve permitir login sem preencher os campos", async () => {
    await loginPage.realizarLogin("", "");

    await expect
      .poll(() =>
        loginPage.usernameInput.evaluate(
          (element: HTMLInputElement) => element.validity.valueMissing,
        ),
      )
      .toBe(true);

    await expect
      .poll(() =>
        loginPage.passwordInput.evaluate(
          (element: HTMLInputElement) => element.validity.valueMissing,
        ),
      )
      .toBe(true);
  });

  test("LOGIN-006 - Não deve permitir login sem informar o usuário", async () => {
    await loginPage.realizarLogin("", "123456");

    await expect
      .poll(() =>
        loginPage.usernameInput.evaluate(
          (element: HTMLInputElement) => element.validity.valueMissing,
        ),
      )
      .toBe(true);
  });

  test("LOGIN-007 - Não deve permitir login sem informar a senha", async () => {
    await loginPage.realizarLogin("admin", "");

    await expect
      .poll(() =>
        loginPage.passwordInput.evaluate(
          (element: HTMLInputElement) => element.validity.valueMissing,
        ),
      )
      .toBe(true);
  });

  test("LOGIN-008 - Não deve realizar login com senha incorreta", async () => {
    await loginPage.realizarLogin("admin", "senhaIncorreta");

    await expect(loginPage.msgErroLogin).toBeVisible();
    await expect(loginPage.msgErroLogin).toHaveText(
      "Usuário ou senha inválidos.",
    );
  });

  test("LOGIN-009 - Não deve realizar login com usuário inexistente", async () => {
    await loginPage.realizarLogin("usuarioInexistente", "123456");

    await expect(loginPage.msgErroLogin).toBeVisible();
    await expect(loginPage.msgErroLogin).toHaveText(
      "Usuário ou senha inválidos.",
    );
  });
});
