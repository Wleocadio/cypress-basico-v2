///<reference types="Cypress" />




beforeEach(() => {
    cy.visit('./src/index.html')
   // cy.viewport(410,810)
});

describe('Central de Atendimento ao Cliente', function() {
    it('Verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche campos Obrigátorios e envia fomulário', function() {
        const longText = 'Testando o campo ajuda, vamos utilizar o Objeto delay para deixar a digitação mais lenta.'
       
        cy.get('#firstName').type("Marcos").should('have.value', 'Marcos')
        cy.get('#lastName').should('be.visible').type('Suave').should('have.value', 'Suave')
        cy.get('#email').type('suave@gmail.com').should('have.value', 'suave@gmail.com')
        cy.get('#open-text-area').should('be.visible').type(longText,  {delay: 10 }).should('have.value', longText)
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        //cy.contains('Mensagem enviada com sucesso.').should('be.visible')
    });
    it('Email formato invalido', () => {
        cy.get('#firstName').type('Matheus').should('have.value','Matheus')
        cy.get('#lastName').type('Lamus').should('have.value', 'Lamus')
        cy.get('#email').should('be.visible').type('lamus.gmail.com').should('have.value', 'lamus.gmail.com')
        cy.get('#open-text-area').should('be.visible').type('Olá bem vindo ao teste',{delay: 100}).should('have.value', 'Olá bem vindo ao teste')
        //cy.get('button').contains('Enviar').click()
        cy.get('button[type="submit"]').click()
        //cy.contains('Valide os campos obrigatórios!').should('be.visible')
        cy.get('.error').should('be.visible')
    });

    it('Verifica campo telefone em branco', () => {
        cy.get('input[type="number"]').type('lanche').should('have.value','')
    });

    it('Verifica campo telefone obrigatório', () => {
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    });

    it('Preenche e Limpa os campos Nome, Sobrenome, Telefone e Ajuda', () => {
        cy.get('#firstName').type('Fabiano',{delay: 0}).should('have.value', 'Fabiano').clear().should('have.value', '')
        cy.get('#lastName').type('Filho',{delay: 0}).should('have.value', 'Filho').clear().should('have.value','')
        cy.get('#email').type('ffilho@gmail.com',{delay: 0}).should('have.value','ffilho@gmail.com').clear().should('have.value','')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#phone').type('11990909090', {delay:0}).should('have.value','11990909090').clear().should('have.value','')
        cy.get('#open-text-area').type('Treinando para virar um Analista de Teste',{delay: 0}).should('have.value','Treinando para virar um Analista de Teste')
        cy.get('#open-text-area').clear().should('have.value','')
    });

    it('Teste sem preencher campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible');
        
    });

    it('Preencher o formulario e enviar', () => {
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        
    });

    it('Identificar campos sem usar o GET', () => {
        cy.contains('button', 'Enviar').click()
    });

    it('Selecionar um protudo pelo seu testo (youtube)', () => {
        
        cy.get('#product')
          .select('YouTube')    
          .should('have.value','youtube')
    });


    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        
         
        cy.get('#product')  
          .select('mentoria')
          .should('have.value', 'mentoria')
    });


    it('selecionar um produto pelo indice', () => {
        
        cy.get('#product') 
          .select(2)
          .should('have.value', 'cursos')
    });

    it('marca o tipo de atendimento Feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('be.checked')
          .should('have.value','feedback')
    });

    it('marcar o tipo de atendimento "primeiro"', () => {
        cy.get('input[type="radio"]')
          .first()
          .check()
          .should('be.checked')
          .should('have.value', 'ajuda')
    });

    it('marcar cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function ($radio) {
            cy.wrap($radio)
              .check()
            cy.wrap($radio)
              .should('be.checked')
          })

    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')    
    
    });

    it('exibe mensagem de erro telefone obrigatório', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('input[type="radio"]')
          .check('feedback')
          .should('be.checked')
          .should('have.value','feedback')

        cy.get('#product')
          .select('YouTube')
          .should('have.value','youtube')
        
        cy.get('#phone-checkbox')
          .check()
          .should('be.checked')


        cy.get('button[type="submit"]')
          .click()

        cy.get('.error')
          .should('be.visible')
    });

    it('seleciona um arquivo da pasta fixture', () => {

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/Arquivo1.txt')
            .should(function ($input) {
               expect($input[0].files[0].name).to.equal('Arquivo1.txt')
        })
           
    });

    it('seleciona um arquivo simulando drag-and-drop', () => {
        
        cy.get('input[type="file"]')
           .should('not.have.value')
           .selectFile('cypress/fixtures/Arquivo2.docx', {action: 'drag-drop'})
           .should(function ($input) {
            console.log($input)
            expect($input[0].files[0].name).to.equal('Arquivo2.docx')
           })

    });

    it('seleciona dois arquivos da pasta fixture', () => {
        
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile(['cypress/fixtures/Arquivo1.txt', 'cypress/fixtures/Arquivo2.docx'])
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('Arquivo1.txt')
                expect($input[0].files[1].name).to.equal('Arquivo2.docx')
            })
    });

    it('selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        
        cy.fixture('Arquivo1.txt', {encoding: null}).as('arquivo')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@arquivo')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('Arquivo1.txt')
            })
        
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um click', () => {
        
        cy.get('#privacy a')
            .should('have.attr', 'target','_blank')
        
    });

    it('removendo p target e clicando no link', () => {
        
        cy.get('#privacy a')
            .invoke('removeAttr','target')
            .click()
        
    });

    it('testando a página de privacidade', () => {
        
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.title()
            .should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.get('#title')
            .should('contain','CAC TAT - Política de privacidade')
        
        cy.get('#white-background > :nth-child(5)')
            .should('contain', 'Talking About Testing')

    });




});

