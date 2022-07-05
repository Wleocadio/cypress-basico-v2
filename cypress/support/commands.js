
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){ 
    const longText = 'Testando o campo ajuda, vamos utilizar o Objeto delay para deixar a digitação mais lenta.'
       
    cy.get('#firstName').type("Marcos").should('have.value', 'Marcos')
    cy.get('#lastName').should('be.visible').type('Suave').should('have.value', 'Suave')
    cy.get('#email').type('suave@gmail.com').should('have.value', 'suave@gmail.com')
    cy.get('#open-text-area').should('be.visible').type(longText,  {delay: 10 }).should('have.value', longText)
    //cy.get('button[type="submit"]').click()


})

Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
      cy.visit('/login')
      cy.get('[data-test=username]').type(username)
      cy.get('[data-test=password]').type(password)
      cy.get('#login').click()
      cy.url().should('contain', '/login-successful')
    })
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
