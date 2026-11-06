# Playwright EstoqueLab

Automação de testes End-to-End (E2E) para a plataforma **EstoqueLab**, desenvolvida com Playwright e TypeScript.

O projeto tem como objetivo aplicar boas práticas de automação de testes, explorando a estruturação de cenários, reutilização de componentes, organização do código e validação de funcionalidades por meio de testes automatizados.

---

## Sobre o projeto

O EstoqueLab é uma aplicação web utilizada como ambiente de estudo para desenvolver e demonstrar conhecimentos em automação de testes funcionais.

A automação está sendo construída de forma incremental, começando pelos fluxos de autenticação e evoluindo conforme novas funcionalidades e possibilidades de validação são exploradas.

**Aplicação:** https://estoquelab.netlify.app/

## Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| [Playwright](https://playwright.dev/) | Framework de automação de testes E2E |
| [TypeScript](https://www.typescriptlang.org/) | Linguagem utilizada no desenvolvimento dos testes |
| [Node.js](https://nodejs.org/) | Ambiente de execução |
| [Git](https://git-scm.com/) | Controle de versão |
| [GitHub](https://github.com/) | Hospedagem do código-fonte |

## Estrutura do projeto

A organização segue uma abordagem baseada no padrão **Page Object Model (POM)**, separando os elementos e as ações das páginas da implementação dos cenários de teste.

```text
playwright-estoquelab/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── pages/
│   └── LoginPage.ts
│
├── tests/
│   └── e2e/
│       └── login.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

**Responsabilidade dos principais diretórios:**

- `pages/`: contém as classes que representam as páginas da aplicação, seus elementos e suas ações.
- `tests/e2e/`: contém os cenários de testes automatizados.
- `.github/workflows/`: contém a configuração de integração contínua com GitHub Actions.
- `playwright.config.ts`: centraliza as configurações de execução do Playwright.

## Arquitetura e decisões técnicas

### Page Object Model (POM)

O projeto utiliza o padrão Page Object Model para promover a separação de responsabilidades e reduzir a duplicação de código.

Cada página possui uma classe responsável por centralizar seus elementos e disponibilizar métodos que representam ações realizadas pelo usuário.

Exemplo da estrutura utilizada na página de login:

```typescript
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByTestId("...");
    this.passwordInput = page.getByTestId("...");
    this.loginButton = page.getByRole("button", {
      name: "Entrar",
    });
  }

  async acessar(): Promise<void> {
    await this.page.goto("/");
  }

  async realizarLogin(
    usuario: string,
    senha: string
  ): Promise<void> {
    await this.usernameInput.fill(usuario);
    await this.passwordInput.fill(senha);
    await this.loginButton.click();
  }
}
```

*Exemplo ilustrativo da estrutura da classe. Os seletores devem corresponder aos identificadores reais da aplicação.*

Essa abordagem permite que os testes utilizem métodos reutilizáveis, sem precisar repetir a implementação das interações com os elementos da interface.

### Estratégia de seletores

A automação prioriza seletores estáveis e orientados à acessibilidade, como:

- `getByTestId()`: identificação de elementos por atributos de teste.
- `getByRole()`: localização de elementos por sua função e nome acessível.
- `getByPlaceholder()`: localização de campos por seus textos de orientação, quando aplicável.

A escolha dos seletores busca reduzir a dependência da estrutura visual e de detalhes de implementação do HTML.

### Separação entre ações e validações

As interações com a página são centralizadas no Page Object, enquanto as verificações dos resultados permanecem nos arquivos de especificação (`.spec.ts`).

Com isso, a implementação dos testes fica mais organizada, legível e fácil de manter.

---

## Cenários automatizados

### Autenticação

O primeiro conjunto de testes contempla o fluxo de autenticação da aplicação.

| ID | Cenário | Validação |
|---|---|---|
| LOGIN-001 | Acessar a tela de login | Exibição do título e dos campos de autenticação |
| LOGIN-002 | Realizar login com credenciais válidas | Acesso à aplicação após autenticação |
| LOGIN-003 | Realizar login com credenciais inválidas | Exibição da mensagem "Usuário ou senha inválidos." |
| LOGIN-004 | Realizar login com a opção "Mantenha-me conectado" marcada | Marcação do checkbox e autenticação bem-sucedida |

### Estratégia de validação

Os cenários utilizam as assertions do Playwright, principalmente:

- `toBeVisible()`: verifica se um elemento está visível.
- `toHaveText()`: valida o conteúdo textual de um elemento.
- `toBeChecked()`: verifica se um checkbox está marcado.

As verificações utilizam mecanismos de espera automática do Playwright, evitando a necessidade de esperas fixas e desnecessárias.

---

## Configuração do Playwright

As configurações principais ficam centralizadas no arquivo `playwright.config.ts`.

Entre as definições utilizadas estão:

- **Base URL:** endereço principal da aplicação.
- **Browser:** Chromium.
- **Timeout:** limite de tempo para execução dos testes.
- **Expect Timeout:** limite de espera das assertions.
- **Screenshots:** captura de imagens em caso de falha.
- **Videos:** gravação de vídeos em caso de falha.
- **Trace:** coleta de rastros de execução para auxiliar na análise de erros.
- **HTML Reporter:** geração de relatório visual dos resultados.

A execução está inicialmente configurada para Chromium, permitindo concentrar os primeiros esforços na cobertura funcional antes de ampliar a estratégia para outros navegadores.

## Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- Git instalado.
- Navegador Chromium instalado pelo Playwright.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/mendesvitoor/playwright-estoquelab.git
```

Acesse o diretório:

```bash
cd playwright-estoquelab
```

Instale as dependências:

```bash
npm install
```

Instale o navegador utilizado nos testes:

```bash
npx playwright install chromium
```

### Executando os testes

Executar todos os testes:

```bash
npm test
```

Executar somente no Chromium:

```bash
npm run test:chromium
```

Executar com interface visual:

```bash
npm run test:headed
```

Abrir a interface interativa do Playwright:

```bash
npm run test:ui
```

Executar em modo de depuração:

```bash
npm run test:debug
```

Abrir o relatório HTML:

```bash
npm run test:report
```

## Relatórios e análise de falhas

O projeto utiliza o HTML Reporter do Playwright para apresentar os resultados das execuções.

Além disso, a configuração prevê a coleta de evidências em caso de falha:

- Screenshots: imagem do estado da página.
- Vídeos: gravação da execução.
- Traces: informações detalhadas sobre as ações e eventos ocorridos durante o teste.

Esses recursos auxiliam na investigação de falhas, facilitando a identificação de comportamentos inesperados e possíveis problemas na aplicação.

## Integração contínua (CI)

O projeto possui uma configuração inicial de GitHub Actions em:

`.github/workflows/playwright.yml`

O workflow está preparado para executar os testes automaticamente em eventos de `push` e `pull_request` direcionados às branches `main` e `master`.

O processo contempla:

1. Checkout do repositório.
2. Configuração do Node.js.
3. Instalação das dependências.
4. Instalação dos navegadores do Playwright.
5. Execução dos testes automatizados.
6. Publicação do relatório HTML como artefato da execução.

## Próximos passos

O projeto está em desenvolvimento e possui uma evolução planejada por etapas:

- [x] Configuração inicial do Playwright com TypeScript.
- [x] Configuração do ambiente de execução com Chromium.
- [x] Implementação inicial do Page Object Model.
- [x] Automação dos primeiros cenários de autenticação.
- [x] Validação de login com credenciais válidas e inválidas.
- [x] Validação do checkbox "Mantenha-me conectado".
- [ ] Ampliar a cobertura dos fluxos funcionais da aplicação.
- [ ] Desenvolver novos Page Objects e componentes reutilizáveis.
- [ ] Implementar cenários negativos e de validação de campos.
- [ ] Evoluir a execução e análise dos testes via GitHub Actions.
- [ ] Avaliar a execução cross-browser.
- [ ] Aprimorar a geração e análise de relatórios.

---

## Objetivo de aprendizado

Este projeto faz parte da evolução prática em automação de testes de software, com foco na aplicação de conceitos de qualidade, organização de código, arquitetura de testes e boas práticas de desenvolvimento de automações.

Mais do que automatizar interações com a interface, a proposta é construir uma estrutura sustentável, reutilizável e preparada para receber novos cenários conforme a evolução da cobertura de testes.
