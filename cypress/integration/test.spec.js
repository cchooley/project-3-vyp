describe('GOGOT', function () {
    it('Should pass all tests', function () {
        cy.visit('/')
        cy.url().should('eq', 'http://localhost:4200/home')
        cy.title().should('include', 'P3Vyp')
        cy.get('.seussicalImg').should('be.visible')
        cy.get('.subNav').children().should('have.length', 3)
        cy.get('#navbar').children().should('have.length', 6)
        cy.contains('Seussical').click()
        cy.url().should('eq', 'http://localhost:4200/seussical')
        cy.get('.seussicalImg').should('be.visible')
        cy.contains('About').click()
        cy.get('.descCard').should('be.visible')
        cy.get('.staffCard').should('have.length', 4)

    })
})