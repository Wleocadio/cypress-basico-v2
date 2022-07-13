
Cypress.Commands.add('cadastro', dados => {

  cy.get('input[type="text"][name="firstName"]').should('be.visible').type(dados.name, { delay: 0 }).should('have.value', dados.name)
  cy.get('input[type="text"][name="lastName"]').should('be.visible').type(dados.lastname, { delay: 0 }).should('have.value', dados.lastname)
  cy.get('input[type="email"]').should('be.visible').type(dados.email, { delay: 0 }).should('have.value', dados.email)
  cy.get('#open-text-area').should('be.visible').type('Refazendo todos os exercicios').should('have.value', 'Refazendo todos os exercicios')
})

Cypress.Commands.add('cadastroclear', dados => {

  cy.get('input[type="text"][name="firstName"]').should('be.visible').type(dados.name).should('have.value', dados.name).clear()
  cy.get('input[type="text"][name="lastName"]').should('be.visible').type(dados.lastname).should('have.value', dados.lastname).clear()
  cy.get('input[type="email"]').should('be.visible').type(dados.email).should('have.value', dados.email).clear()
  cy.get('input[type="number"][name="phone"]').should('be.visible').type(dados.phone).should('have.value', dados.phone).clear()
  cy.get('#open-text-area').should('be.visible').type('Refazendo todos os exercicios').should('have.value', 'Refazendo todos os exercicios').clear()
})

Cypress.Commands.add('buttonSubmit', () => {

  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('checkSuccessMessage', () => {

  cy.get('.success').should('be.visible')
})

Cypress.Commands.add('checkErrorMessage', () => {

  cy.get('.error').should('be.visible')
})

Cypress.Commands.add('selectfile', () => {

  cy.get('input[type="file"]').should('exist').selectFile(['cypress/fixtures/Arquivo1.txt', 'cypress/fixtures/Arquivo2.docx'])
    .should(function ($input) { // verifica o nome do arquivo
      expect($input[0].files[0].name).to.equal('Arquivo1.txt')
    })
})

Cypress.Commands.add('selectFileDragDrop', () => {

  cy.get('input[type="file"]').should('exist').selectFile({ contents: 'cypress/fixtures/Arquivo1.txt' }, { action: 'drag-drop' })
    .should(function ($input) {
      expect($input[0].files[0].name).to.equal('Arquivo1.txt')

    })
})


Cypress.Commands.add('requestHttp', () => {

  cy.request({
    method: 'GET',
    url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html',
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.statusText).to.equal('OK')
    expect(response.body).to.include('CAC TAT')
  })
})

Cypress.Commands.add('requestHttpTwo', () => {

  cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function (response) {
      const { status, statusText, body } = response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.contain("CAC TAT")


    })
})

Cypress.Commands.add('showMessageThreeSeconds', () => {

  cy.clock()
  cy.get('.success').invoke('show').should('be.visible')
  cy.wait(3000)
  cy.tick()
  cy.get('.success').invoke('hide').should('not.be.visible')
})

Cypress.Commands.add('alisFixture', () => {

  cy.fixture('Arquivo1.txt', { encoding: null }).as('arquivo')
  cy.get('input[type="file"]').should('not.have.value').selectFile('@arquivo')
    .should(function ($input) {
      expect($input[0].files[0].name).to.equal('Arquivo1.txt')
    })
})

Cypress.Commands.add('checkEach', () => {

  cy.get('input[type="radio"]').should('have.length', 3)
    .each(function ($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
      
    })
  
})