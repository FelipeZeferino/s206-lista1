///<reference = cypress>
describe('Orientador', () => {
  let orientadorData, nomeProjetoTeste;
  before(() => {
      orientadorData = createOrientador();
      nomeProjetoTeste = `projeto${orientadorData.email}`;
  });
  beforeEach(() => {
    cy.visit("https://confianopai.com/login");
    cy.get(":nth-child(2) > .sc-ktwOfi").type("torres@");
    cy.get(":nth-child(3) > .sc-ktwOfi").type("123");
    cy.get(".sc-csKJxZ").click({ force: true });
    cy.url().should("include", "/adm/projetos");
  });
    it('should create Orientador', () => {
      const { id, password, email } = orientadorData;
      cy.get('[href="/adm/novo-usuario"]').click();
      cy.get('.sc-dsAqUS').select('Orientador');
      cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type(id);
      cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type(email);
      cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(password);
      cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!');
  });
    it('should NOT create Orientador if username and email is the same', () => {
      const { id, password, email } = orientadorData;
      cy.get('[href="/adm/novo-usuario"]').click();
      cy.get('.sc-dsAqUS').select('Orientador');
      cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type(id);
      cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type(email);
      cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(password);
      cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Falha ao criar usuário.');
  });
    it('should insert orientador into team', () => {
      const { email } = orientadorData;
      cy.get('.sc-jdHILj').click();
      cy.get('[href="/adm/add-projeto/cadastro"]').click();
      cy.get('.sc-fYrVWQ > .sc-hsaIUA').type(nomeProjetoTeste);
      cy.get(':nth-child(2) > :nth-child(2) > .sc-hsaIUA').type('userprojeto2030767@gmail.com');
      cy.get(':nth-child(6) > :nth-child(2) > .sc-hsaIUA').type(email);
      cy.get(':nth-child(1) > .sc-bZTyFN > .sc-hlqirL').select('Sem pendências');
      cy.get(':nth-child(2) > .sc-bZTyFN > .sc-hlqirL').select('Projeto Internacional');
      cy.get('.sc-eGgGjL > :nth-child(1)').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Equipe criada com sucesso!');
  });
    it('should NOT insert invalid orientador into team', () => {
      const { email } = orientadorData;
      cy.get('.sc-jdHILj').click();
      cy.get('[href="/adm/add-projeto/cadastro"]').click();
      cy.get('.sc-fYrVWQ > .sc-hsaIUA').type(nomeProjetoTeste);
      cy.get(':nth-child(2) > :nth-child(2) > .sc-hsaIUA').type('userprojeto2030767@gmail.com');
      cy.get(':nth-child(6) > :nth-child(2) > .sc-hsaIUA').type(`${email}1`);
      cy.get(':nth-child(1) > .sc-bZTyFN > .sc-hlqirL').select('Sem pendências');
      cy.get(':nth-child(2) > .sc-bZTyFN > .sc-hlqirL').select('Projeto Internacional');
      cy.get('.sc-eGgGjL > :nth-child(1)').click();
      cy.get('#\x32  > .Toastify__toast-body > :nth-child(2)').should('contain.text', 'Erro ao criar equipe: Error: Orientador não está cadastrado');
  });
    it('should have new project on project list', () => {
      const { email } = orientadorData;
      cy.get('.sc-ckdEwu').type(nomeProjetoTeste);
      cy.get('.sc-eAKtBH > svg').click();
      cy.get(':nth-child(3) > :nth-child(2)').should('contain.text', email);
    });
});

function createOrientador() {
    let hour = new Date().getHours().toString();
    let minutes = new Date().getMinutes().toString();
    let seconds = new Date().getSeconds().toString();
    let id = hour + minutes + seconds + 'id';
    let password = hour + minutes + seconds + 'senha';
    let email = hour + minutes + seconds + '@teste.com';

    return { id, password, email };
}