///<reference types="Cypress" />

import cadastro from '../Dados/Cadastro.js'


describe('Central de Atendimento ao Cliente TAT', function () {
    var dados = ''
    dados = cadastro.dados()

    beforeEach(() => {

        cy.visit('./src/index.html')
        

    });
    it('Verifica o título da aplicação', function () {

        cy.get('#title').should('have.text', 'CAC TAT')
    });

    it('Preenche campos Obrigátorios e envia fomulário', function () {
        // var dados = cadastro.dados()

        cy.cadastro(dados)
        cy.buttonSubmit()
        cy.checkSuccessMessage()
    });
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        //var dados = cadastro.dados()

        dados.email = 'email.com.br'

        cy.cadastro(dados)
        cy.buttonSubmit()
        cy.checkErrorMessage()
    });

    it('Verifica campo telefone em vazio', () => {

        cy.get('input[name="phone"]').should('have.value', '')
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', () => {

        cy.cadastro(dados)
        cy.get('#phone-checkbox').should('not.be.checked').check().should('be.checked')
        cy.buttonSubmit()
        cy.checkErrorMessage()

    });

    it('Preenche e Limpa os campos Nome, Sobrenome, email, Telefone e Ajuda', () => {

        cy.cadastroclear(dados)
    });

    it('Teste sem preencher campos obrigatórios', () => {

        cy.buttonSubmit()
        cy.checkErrorMessage()
    });

    it('Identificar campos sem usar o GET', () => {

        cy.contains('Enviar').click()
        cy.checkErrorMessage()

    });

    it('Selecionar um produto pelo seu texto (youtube)', () => {

        cy.get('select').select('YouTube').should('contain', 'YouTube')
    });

    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {

        cy.get('select').select('Mentoria').should('have.value', 'mentoria')
    });

    it('Selecionar um produto pelo índice', () => {

        cy.get('select').select(1).should('have.value', 'blog')
    });

    it('Marca o tipo de atendimento Feedback', () => {

        cy.get('input[type="radio"][value="feedback"]').should('not.be.checked').check().should('be.checked')
    });

    it('Marcar o primeiro tipo de atendimento', () => {

        cy.get('input[type="radio"]').first().check().should('be.checked')
    });

    it('Marcar cada tipo de atendimento', () => {

        cy.checkEach()

    });

    it('Marca ambos checkboxes, depois desmarca o último', () => {

        cy.get('input[type="checkbox"]').should('not.be.checked').check().should('be.checked')
    });

    it('Seleciona um arquivo da pasta fixture', () => {

        cy.selectfile()
    });

    it('Seleciona um arquivo simulando drag-and-drop', () => {

        cy.selectFileDragDrop()
    });

    it('Selecionar um arquivo utilizando uma fixture para a qual foi dada um aliás', () => {

        cy.alisFixture()
    });

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um click', () => {

        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('Removendo o target e clicando no link', () => {

        cy.get('#privacy a').invoke('removeAttr', 'target').click()
    });

    it('Clicando na página de privacidade sem abrir nova aba', () => {

        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.get('#title').should('be.visible').should('contain', 'CAC TAT - Política de privacidade')
    });

    it('Exibe mensagem por 3 segundos, utilizar o .clock e .tick', () => {

        cy.showMessageThreeSeconds()
    });

    Cypress._.times(5, () => {
        it('Utilizar o Cypress._.times para preencher e enviar o formulario 5 vezes', () => {

            cy.requestHttp()

        });
    })

    it('Exibe e esconde a mensagens de sucesso e erro usando o .invoke', () => {

        cy.get('.error').invoke('show').should('be.visible').invoke('hide').should('not.be.visible')
    });

    it('Preencher a area de texto itulizando o invoke e com a funcionalidade Cypress._.repeat', () => {

        const longText = Cypress._.repeat('Curso Básico de Cypress!', 10)

        cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)
    });

    it('Faz uma requisição HTTP', () => {

        cy.requestHttp()
    });

    it('Faz uma requisição HTTP de outra forma', () => {

        cy.requestHttpTwo()
    });

    it('Deixe o Gato visível', () => {

        cy.get('#cat').should('not.be.visible').invoke('show').should('be.visible')
    })

});

