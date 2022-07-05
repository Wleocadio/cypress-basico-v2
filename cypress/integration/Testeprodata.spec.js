///<reference types="Cypress" />




beforeEach(() => {
    cy.visit('http://10.161.0.229:8058/')
   // cy.viewport(410,810)
});

describe('Testando acesso prodata', () => {
    
    it('Verifica title', () => {
        cy.title().should('be.equal', '.:: VTWeb Admin ::.')
    });

    it.only('Acesso Vtweb', () => {
        cy.get('#txtLogin').should('be.visible').type('wleocadio').should('have.value','wleocadio')
        cy.get('#txtSenha').should('be.visible').type('Master177*').should('have.value', 'Master177*')
        cy.get('#loginbutton').click()
    });
});