import { test, expect } from "@playwright/test";
import { LoginPage } from "../../e2e/login/loginPage";
import { CadastroPage } from "../../e2e/cadastro/cadastroPage";

test.describe("Cadastro de usuário - EstoqueLab", () => {
  let loginPage: LoginPage;
  let registerPage: CadastroPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new CadastroPage(page);

    await loginPage.acessar();
    await loginPage.acessarCadastro();
  });

  test("CADASTRO-001 - Deve cadastrar um novo usuário com sucesso", async () => {
    const usuario = `qa_${Date.now()}`;

    await registerPage.realizarCadastro(usuario, "Senha@123");

    await expect(registerPage.successToast).toBeVisible();
  });

  test("CADASTRO-002 - Deve cadastrar e realizar login com o novo usuário", async ({
    page,
  }) => {
    const usuario = `qa_${Date.now()}`;
    const senha = "Senha@123";

    await registerPage.realizarCadastro(usuario, senha);

    await expect(registerPage.successToast).toBeVisible();

    await expect(loginPage.usernameInput).toHaveValue(usuario);

    await loginPage.passwordInput.fill(senha);
    await loginPage.loginButton.click();

    await expect(loginPage.successLoginToast).toBeVisible();
  });

  test("CADASTRO-003 - Não deve permitir cadastro sem preencher os campos", async () => {
    await registerPage.realizarCadastro("", "");

    await expect
      .poll(() =>
        registerPage.usernameInput.evaluate(
          (element: HTMLInputElement) => element.validity.valueMissing,
        ),
      )
      .toBe(true);

    await expect
      .poll(() =>
        registerPage.passwordInput.evaluate(
          (element: HTMLInputElement) => element.validity.valueMissing,
        ),
      )
      .toBe(true);
  });

  test("CADASTRO-004 - Não deve permitir cadastro sem informar o usuário", async () => {
    await registerPage.realizarCadastro("", "Senha@123");

    await expect
      .poll(() =>
        registerPage.usernameInput.evaluate(
          (element: HTMLInputElement) => element.validity.valueMissing,
        ),
      )
      .toBe(true);
  });

  test("CADASTRO-005 - Não deve permitir cadastro sem informar a senha", async () => {
    await registerPage.realizarCadastro("qa_teste", "");

    await expect
      .poll(() =>
        registerPage.passwordInput.evaluate(
          (element: HTMLInputElement) => element.validity.valueMissing,
        ),
      )
      .toBe(true);
  });

  test("CADASTRO-006 - Não deve permitir cadastrar um usuário já existente", async () => {
    const usuario = `qa_${Date.now()}`;

    await registerPage.realizarCadastro(usuario, "Senha@123");
    await expect(registerPage.successToast).toBeVisible();

    await loginPage.acessarCadastro();

    await registerPage.realizarCadastro(usuario, "Senha@123");

    await expect(registerPage.usernameInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
  });
});
