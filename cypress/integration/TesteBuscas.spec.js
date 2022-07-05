///<reference types="Cypress" />




beforeEach(() => {
    cy.visit('http://www.aprendendotestar.com.br/treinar-automacao.php')
})

describe('Testando Buscas', () => {
    
    it('Deixando o nome em branco e retornando msg de erro ', () => {

        
        cy.get(':nth-child(2) > td > input').should('be.visible').type('Teste').should('have.value', 'Teste')
        cy.get(':nth-child(4) > td > input').should('be.visible').type('teste2').should('have.value', 'teste2')
        cy.get('.btn[type="submit"]').click()
        cy.contains('Existem campos em branco.').should('be.visible')
    });

    it.only('Cadastro com success e verifica na tabela ', () => {
        const username = 'Teste'
        const password = 'teste2'
        const name = 'Testando'

        cy.get(':nth-child(2) > td > input').should('be.visible').type(username, {delay: 100}).should('have.value', username)
        cy.get(':nth-child(4) > td > input').should('be.visible').type(password, {delay: 0}).should('have.value', password)
        cy.get(':nth-child(6) > td > input').should('be.visible').type(name).should('have.value', name)
        cy.get('.btn[type="submit"]').click()
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('contain',name)
        cy.get('tbody > :nth-child(2) > :nth-child(3)').should('contain',username)
        cy.get(':nth-child(2) > :nth-child(4)').contains(password).should('be.visible')
        //cy.get(':nth-child(2) > :nth-child(5) > a').click()
    });

});