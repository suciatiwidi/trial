class EmpatLoginPage {
    // Locators
    elements = {
        usernameInput: () => cy.get("input[name='username']"),
        passwordInput: () => cy.get("input[name='password']"),
        submitButton: () => cy.get("button[type='submit']"),
        alertMessage: () => cy.get('.oxd-alert-content-text'),
        errorMessage: () => cy.get('.oxd-input-field-error-message'),
        forgotPasswordLink: () => cy.get('.orangehrm-login-forgot-header'),
        resetPasswordTitle: () => cy.get('.orangehrm-forgot-password-title'),
        branding: () => cy.get('.orangehrm-login-branding'),
        socialLinks: () => cy.get('.orangehrm-login-footer-sm').find('a'),
        dashboardHeader: () => cy.get('.oxd-topbar-header-breadcrumb')
    }

    // Actions
    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    fillUsername(username) {
        if (username) {
            this.elements.usernameInput().type(username);
        }
    }

    fillPassword(password) {
        if (password) {
            this.elements.passwordInput().type(password);
        }
    }

    clickSubmit() {
        this.elements.submitButton().click();
    }

    login(username, password) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickSubmit();
    }

    clickForgotPassword() {
        this.elements.forgotPasswordLink().click();
    }
}

export default new EmpatLoginPage();