describe('The Landing Page', () => {
  it('successfully loads', () => {
    cy.visit('http://127.0.0.1:5173/')
  })
})

it('test a guess and click submit', ()=> {
  cy.visit('http://127.0.0.1:5173/')
  cy.wait(2000)
  cy.get('input').type('New Zealand')
  cy.wait(2000)
  cy.get('button').click()
  cy.wait(5000)
})