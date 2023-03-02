describe('Registration', () => {
  it('Complete registration successfully', () => {
    cy.visit("/", {onLoad: () => {
      //dismiss welcome modal
      cy.get('#welcome_modal').contains('Got it').click()

      //click sign up
      cy.get('.header--right').contains('Sign up').click()

      // fill the form complete the user registration
      cy.get('form[data-test="form-registration_form_1"]').within(() => {
        const email = generateRandomEmail()
        const password = '14vayAkX63GR'
        cy.get('input[data-test="input-email"]').type(email)
        cy.get('input[data-test="input-terms_and_conditions"]').click({force: true})
        cy.get('input[data-test="input-password"]').type(password)
        cy.get('input[data-test="input-password_confirmation"]').type(password)
        cy.get('input[data-test="input-bonus"]').click({force: true})
        //complete registration
        cy.get('button[data-test="control-submit"]').click()
      })

      //assert the url is the expected one
      cy.url().should('include', 'registrationSuccess')
      //assert that some elements of the page are visible
      cy.get('.notification__content').within(() => {
        cy.contains('Congratulations!').should('be.visible')
        cy.contains('View profile').should('be.visible')
        cy.contains('Browse games').should('be.visible')
      })
    }})
  })
})


const generateRandomEmail = (length = 10) => [...Array(length)].map(() => Math.random().toString(36)[2]).join('').concat('@wifame.com')