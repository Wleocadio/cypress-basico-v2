
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){ 
    const longText = 'Testando o campo ajuda, vamos utilizar o objeto delay para deixar a digitação mais rápida.'
       
    cy.get('#firstName')
      .should('be.visible')
      .type("Marcos")
      .should('have.value', 'Marcos')

    cy.get('#lastName')
      .should('be.visible')
      .type('Suave')
      .should('have.value', 'Suave')

    cy.get('#email')
      .should('be.visible')
      .type('msuave@gmail.com')
      .should('have.value', 'msuave@gmail.com')

    cy.get('#open-text-area')
      .should('be.visible')
      .type(longText,  {delay: 0 })
      .should('have.value', longText)
    //cy.get('button[type="submit"]').click()


})

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
