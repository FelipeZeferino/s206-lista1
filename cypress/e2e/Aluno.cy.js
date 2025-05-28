// <reference = cypress>

describe('Aluno', () => {
  let alunoData, nomeProjetoTeste;
  before(() => {
      alunoData = createAluno();
      nomeProjetoTeste = `projeto${alunoData.email}`;
  });
  beforeEach(() => {
    cy.visit("https://confianopai.com/login");
    cy.get(":nth-child(2) > .sc-ktwOfi").type("torres@");
    cy.get(":nth-child(3) > .sc-ktwOfi").type("123");
    cy.get(".sc-csKJxZ").click({ force: true });
    cy.url().should("include", "/adm/projetos");
  });
  it("1. Exibir projetos", () => {
    cy.visit('https://confianopai.com/')
    cy.get('.sc-csKJxZ').click()
    cy.get('.sc-eXzmLu').click() // as vezes ele redireciona para a pagina de not found
    cy.get(':nth-child(2) > .sc-ktwOfi').type("teste.aluno@ges.inatel.br")
    cy.get(':nth-child(3) > .sc-ktwOfi').type("123")
    cy.get('.sc-csKJxZ').click()
    cy.get('[href="/aluno/projetos/25"]').click()
    cy.get('.sc-ihZFQb > img').click()
  })
  it("2. Criação de aluno com sucesso", () => {
    const { id, password, email } = createAluno();
    cy.get('[href="/adm/novo-usuario"]').click();
    cy.get('.sc-dsAqUS').select('Aluno');
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type(id);
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type(email);
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(password);
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!');
  })
  it("3. Criação de aluno com falha", () => {
    const { id, password, email } = alunoData;
      cy.get('[href="/adm/novo-usuario"]').click();
      cy.get('.sc-dsAqUS').select('Aluno');
      cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type(id);
      cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type(email);
      cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click();
  })
  it("4. Login do aluno com sucesso", () => {
    cy.visit('https://confianopai.com/')
    cy.get('.sc-csKJxZ').click() //logout
    //cy.get('.sc-eXzmLu').click() // as vezes ele redireciona para a pagina de not found
    cy.get(':nth-child(2) > .sc-ktwOfi').should('be.visible').type(alunoData.email)
    cy.get(':nth-child(3) > .sc-ktwOfi').should('be.visible').type(alunoData.password)
    cy.get('.sc-csKJxZ').click() 
  })
  it("5. Login do aluno com falha (senha incorreta)", () => {
    cy.visit('https://confianopai.com/')
    cy.get('.sc-csKJxZ').click() //logout
    cy.get('.sc-eXzmLu').click() // as vezes ele redireciona para a pagina de not found
    cy.get(':nth-child(2) > .sc-ktwOfi').type("teste.aluno@ges.inatel.br")
    cy.get(':nth-child(3) > .sc-ktwOfi').type("1234")
    cy.get('.sc-csKJxZ').click() 
  })
  it("6. adicionar aluno a um projeto", () => {
    const { email } = alunoData;
    cy.visit('https://confianopai.com/')
    cy.get('[href="/adm/projetos/25"] > .sc-eAKtBH').click()
    cy.get('.sc-cPtzlb > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.sc-ppzwM').type("teste.aluno@ges.inatel.br")
    cy.get('.iTLMzn > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Projeto atualizado com sucesso');
  })
})

function createAluno() {
    let hour = new Date().getHours().toString();
    let minutes = new Date().getMinutes().toString();
    let seconds = new Date().getSeconds().toString();
    let id = hour + minutes + seconds + 'ID';
    let password = hour + minutes + seconds + 'senha';
    let email = hour + minutes + seconds + '@ges.inatel.br';
    return { id, password, email };
}