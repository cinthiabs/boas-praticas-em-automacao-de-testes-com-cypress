describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com')

    cy.get('.navbar-nav a:contains(Login)').click()

    cy.get('#email').type(Cypress.env('user_email'))
    cy.get('#password').type(Cypress.env('user_password'), { log: false })
    cy.get('button[type="submit"]').click()
    
    cy.contains('h1', 'Your Notes',{timeout:10000}).should('be.visible')
  })
 it('CRUD a note',() => {
  cy.contains('Create a new note').click()

  cy.get('#content').type('My note')
  cy.contains('Create').click()
  
  //Assert the note was created
  cy.get('.list-group').should('contain', 'My note').click()

  //updates the note
  cy.get('#content').type(' updated')
  cy.contains('Save').click()

  //assert the note was update
  cy.get('.list-group').should('contain', 'My note updated')
  cy.get('.list-group:contains(My note updated)').should('be.visible').click()

  //delete
  cy.contains('Delete').click()
 //assert the note was deleted
  cy.get('.list-group:contains(My note updated)').should('not.exist')
 })

})
