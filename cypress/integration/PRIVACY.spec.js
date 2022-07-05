it('Testando a página de privacidade', () => {
        
    cy.visit('./src/privacy.html')
    cy.title()
        .shoul('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
    cy.get('#title')
        .should('contain','CAC TAT - Política de privacidade')
    
    cy.get('#white-background > :nth-child(5)')
        .should('contain', 'Talking About Testing')

});