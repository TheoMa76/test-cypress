describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
    cy.contains("Failed to fetch Pokémon cards").should('not.exist')
    cy.contains("API URL or API Key is not defined in the environment variables").should('not.exist')
    cy.get("#search-input").type("pikachu")
    cy.get("#search-button").click()
    cy.contains("Failed to fetch Pokémon cards").should('not.exist')
    cy.get("img").should("exist")
    cy.get("#search-input").clear()
    cy.get("#search-input").type("this does not exist")
    cy.get("#search-button").click()
    cy.contains("Failed to fetch Pokémon cards").should('exist')

  })
})