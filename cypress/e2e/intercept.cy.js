describe ('Fitur Login orangeHRM', () => {
    it('TC_LOG_001 - Login Sukses dengan Credential Valid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='username']").type('Admin');
        cy.get("input[name='password']").type('admin123');

        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('action-summary')

        cy.get("button[type='submit']").click();

        cy.wait('@action-summary').its('response.statusCode').should('eq', 200);
    })
})