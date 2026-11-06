import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Diretório onde os testes automatizados serão encontrados
  testDir: "./tests",

  // Permite execução paralela dos testes
  fullyParallel: true,

  // Impede test.only no CI
  forbidOnly: !!process.env.CI,

  // Nova tentativa somente no CI
  retries: process.env.CI ? 2 : 0,

  // Controle de workers
  workers: process.env.CI ? 1 : undefined,

  // Tempo máximo de execução de cada teste
  timeout: 30_000,

  // Tempo máximo das assertions
  expect: {
    timeout: 5_000,
  },

  // Relatório de execução
  reporter: [
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
      },
    ],
  ],

  // Diretório de evidências e resultados
  outputDir: "test-results",

  // Configurações compartilhadas
  use: {
    // URL principal da aplicação
    baseURL: "https://estoquelab.netlify.app",

    // Timeout de ações
    actionTimeout: 10_000,

    // Timeout de navegação
    navigationTimeout: 15_000,

    // Captura de evidências
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  // Navegador utilizado inicialmente
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
