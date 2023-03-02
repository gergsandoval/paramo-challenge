describe('Loyality', () => {
  it('There are 5 loyality plans', () => {
    const actualPlans = []
    cy.visit('/', { onLoad: () => {
      //dismiss welcome modal
      cy.get('#welcome_modal').contains('Got it').click()
      // go to loyality program
      cy.get('.icon-loyalty').click()
      // get all the programs and extract data from each of them
      cy.get('.loyalty__item').each(($el) => {
        const plan = {
          name: $el.find('.loyalty__item-name').text(),
          points: $el.find('.loyalty__item-value--sum').text().split(' ').join(''),
          about: $el.find('.loyalty__item-value').not('.loyalty__item-value--sum').text()
        }
        actualPlans.push(plan)
      })
    }})
    // retrieve expected plans from a json file and compare them to the extracted data earlier
    cy.fixture('loyality.json').as('expectedPlans').then(expectedPlans => {
        expect(actualPlans).to.eql(expectedPlans)
    })
  })
})