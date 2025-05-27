// <reference types="cypress" />

describe("Testes de Gestão de Projetos", () => {
  const generateTestData = () => {
    const timestamp = new Date().getTime();
    return {
      projectName: `Projeto ${timestamp}`,
      projectMember: "vitor@teste.com",
    };
  };

  beforeEach(() => {
    // Login no sistema antes de executar os testes
    cy.visit("https://confianopai.com/login");
    cy.get(":nth-child(2) > .sc-ktwOfi").type("torres@");
    cy.get(":nth-child(3) > .sc-ktwOfi").type("123");
    cy.get(".sc-csKJxZ").click({ force: true });
    cy.url().should("include", "/adm/projetos");
  });

  it("1. Deve criar um novo projeto com sucesso", () => {
    const testData = generateTestData();
    cy.visit("https://confianopai.com/adm/projetos");
    cy.get(".sc-jdHILj").click();
    cy.get('[href="/adm/add-projeto/cadastro"]').click();

    cy.get(".sc-fYrVWQ > .sc-hsaIUA").type(testData.projectName);
    cy.get(":nth-child(2) > :nth-child(2) > .sc-hsaIUA").type(
      "ppppp@gmail.com"
    );
    cy.get(":nth-child(6) > :nth-child(2) > .sc-hsaIUA").type(
      "felipeb@inatel.br"
    );

    cy.get(":nth-child(1) > .sc-bZTyFN > .sc-hlqirL").select("Com pendência");
    cy.get(":nth-child(2) > .sc-bZTyFN > .sc-hlqirL").select("Outro");
    cy.get(".sc-eGgGjL > :nth-child(1)").click();
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "contain",
      "Equipe criada com sucesso"
    );
  });

  it("2. Deve falhar ao criar projeto sem nome (teste negativo)", () => {
    cy.visit("https://confianopai.com/adm/projetos");
    cy.get(".sc-jdHILj").click();
    cy.get('[href="/adm/add-projeto/cadastro"]').click();

    cy.get(":nth-child(2) > :nth-child(2) > .sc-hsaIUA").type(
      "ppppp@gmail.com"
    );
    cy.get(":nth-child(6) > :nth-child(2) > .sc-hsaIUA").type(
      "felipeb@inatel.br"
    );

    cy.get(":nth-child(1) > .sc-bZTyFN > .sc-hlqirL").select("Com pendência");
    cy.get(":nth-child(2) > .sc-bZTyFN > .sc-hlqirL").select("Outro");
    cy.get(".sc-eGgGjL > :nth-child(1)").click();
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "contain",
      "Por favor, adicione o nome do projeto"
    );
  });

  it("3. Deve alterar a paralela do projeto", () => {
    const testData = generateTestData();
    criarProjetoTeste(testData.projectName, testData.projectMember);

    cy.visit("https://confianopai.com/adm/projetos");
    cy.get(".sc-ckdEwu").type(testData.projectName);
    cy.get(".sc-kMzELR").contains(testData.projectName).click();

    cy.get(".sc-gUjWJS > .sc-kiTBBF").click();
    cy.get(":nth-child(2) > .sc-ldgOGP").select("Projeto Internacional");
    cy.get(".sc-hiTDLB").click();
    cy.get(".iTLMzn > .sc-csKJxZ").click();
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "contain",
      "Projeto atualizado com sucesso!"
    );
  });

  it("4. Deve falhar ao adicionar membro com email inválido (teste negativo)", () => {
    const testData = generateTestData();
    criarProjetoTeste(testData.projectName, testData.projectMember);

    cy.visit("https://confianopai.com/adm/projetos");
    cy.get(".sc-ckdEwu").type(testData.projectName);
    cy.get(".sc-kMzELR").contains(testData.projectName).click();
    cy.get(".sc-cPtzlb > .sc-irLvIq > .sc-csKJxZ").click();
    cy.get(".sc-ppzwM").type("pppppp@gmail.com");
    cy.get(".sc-hiTDLB").click();
    cy.get(".iTLMzn > .sc-csKJxZ").click();
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "contain.text",
      "Aluno não cadastrado:"
    );
  });

  it("5. Deve alterar o status do projeto", () => {
    const testData = generateTestData();
    criarProjetoTeste(testData.projectName, testData.projectMember);

    cy.visit("https://confianopai.com/adm/projetos");
    cy.get(".sc-ckdEwu").type(testData.projectName);
    cy.get(".sc-kMzELR").contains(testData.projectName).click();

    cy.get(".sc-gUjWJS > .sc-kiTBBF").click();
    cy.get(":nth-child(1) > .sc-ldgOGP").select("Sem pendências");
    cy.get(".sc-hiTDLB").click();
    cy.get(".iTLMzn > .sc-csKJxZ").click();
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "contain",
      "Projeto atualizado com sucesso!"
    );
  });

  it("6. Deve apagar time cadastrado", () => {
    const testData = generateTestData();
    criarProjetoTeste(testData.projectName, testData.projectMember);

    cy.visit("https://confianopai.com/adm/projetos");
    cy.get(".sc-ckdEwu").type(testData.projectName);
    cy.get(".sc-kMzELR").contains(testData.projectName).click();

    cy.get('.sc-iCKXBC > [viewBox="0 0 448 512"]').click();
    cy.get(".sc-cZpZpK > :nth-child(1)").click();
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "contain",
      "Time deletado com sucesso!"
    );
    cy.get(".sc-ckdEwu").type(testData.projectName);
    cy.get(".sc-kMzELR").should("not.exist");
  });

  // Função auxiliar para criar projeto de teste
  function criarProjetoTeste(nome, membro) {
    cy.visit("https://confianopai.com/adm/add-projeto");
    cy.get('[href="/adm/add-projeto/cadastro"]').click();
    cy.get(".sc-fYrVWQ > .sc-hsaIUA").type(nome);
    cy.get(":nth-child(2) > :nth-child(2) > .sc-hsaIUA").type(membro);
    cy.get(":nth-child(6) > :nth-child(2) > .sc-hsaIUA").type(
      "felipeb@inatel.br"
    );
    cy.get(":nth-child(1) > .sc-bZTyFN > .sc-hlqirL").select("Com pendência");
    cy.get(":nth-child(2) > .sc-bZTyFN > .sc-hlqirL").select("Outro");
    cy.get(".sc-eGgGjL > :nth-child(1)").click();
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "contain",
      "Equipe criada com sucesso"
    );
  }
});
