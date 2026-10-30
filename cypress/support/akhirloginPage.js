class AkhirLoginPage {
  // Elements / Locators
  usernameInput = "input[name='username']";
  passwordInput = "input[name='password']";
  loginButton = "button[type='submit']";
  errorMessage = ".oxd-alert-content-text";
  dashboardHeader = ".oxd-topbar-header-breadcrumb";
  forgotPasswordLink = ".orangehrm-login-forgot-header";
  resetPasswordHeader = ".orangehrm-forgot-password-container";

  // Actions
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  fillUsername(username) {
    if (username) {
      cy.get(this.usernameInput, { timeout: 10000 }).clear().type(username);
    } else {
      cy.get(this.usernameInput, { timeout: 10000 }).clear();
    }
  }

  fillPassword(password) {
    if (password) {
      cy.get(this.passwordInput, { timeout: 10000 }).clear().type(password, { sensitive: true });
    } else {
      cy.get(this.passwordInput, { timeout: 10000 }).clear();
    }
  }

  clickLogin() {
    cy.get(this.loginButton).should('be.visible').click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
  }

  clickForgotPassword() {
    cy.get(this.forgotPasswordLink).should('be.visible').click();
  }

  // Assertions
  verifyDashboardVisible() {
    cy.get(this.dashboardHeader, { timeout: 10000 }).should('be.visible').and('contain', 'Dashboard');
  }

  verifyErrorMessage(message) {
    cy.get(this.errorMessage, { timeout: 10000 }).should('be.visible').and('contain', message);
  }

  // Dinamis berdasarkan fieldName ('Username' / 'Password')
  verifyRequiredField(fieldName) {
    cy.contains('.oxd-input-group', fieldName)
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');
  }

  verifyPasswordMasked() {
    cy.get(this.passwordInput).should('have.attr', 'type', 'password');
  }

  verifyResetPasswordPage() {
    cy.url().should('include', '/auth/requestPasswordResetCode');
    cy.get(this.resetPasswordHeader, { timeout: 10000 }).should('be.visible');
  }
}

export default new AkhirLoginPage();