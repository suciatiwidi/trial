import logData from "../fixtures/logData.json";

class logPage {
  // Navigasi & URL Validation
  visitUrl() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  }
  loginUrlValidation() {
    cy.url().should("include", "/auth/login");
  }
  dashboardUrlValidation() {
    cy.url().should("include", "/dashboard/index");
  }
  forgotPassUrlValidation() {
    cy.url().should("include", "/auth/requestPasswordResetCode");
  }

  // Input Username & Password
  inputUsername(username) {
    cy.get('[name="username"]').type(username);
  }
  inputPassword(password) {
    cy.get('[name="password"]').type(password);
  }
  passwordFieldValidation() {
    cy.get('[name="password"]').should("have.attr", "type", "password");
  }

  // Buttons & Links
  clickLoginBtn() {
    cy.get(".oxd-button").click();
  }
  clickForgotPassword() {
    cy.contains("Forgot your password?").click();
  }

  // Validation / Alert
  loginAlertValidation(message) {
    cy.get(".oxd-alert-content-text").should("contain", message);
  }
  requiredFieldValidation(message) {
    cy.get(".oxd-input-field-error-message").should("contain", message);
  }
  bothRequiredAlert() {
    cy.get(".oxd-input-field-error-message").should("have.length", 2);
    cy.get(".oxd-input-field-error-message").each(($el) => {
      cy.wrap($el).should("contain", "Required");
    });
  }

  // Login Reusable Helper
  login() {
    this.visitUrl();
    this.inputUsername(logData.validUsername);
    this.inputPassword(logData.validPassword);
    this.clickLoginBtn();
    this.dashboardUrlValidation();
  }

  // Intercept Methods
  interceptTimeAtWork() {
    cy.intercept("GET", "**/dashboard/employees/time-at-work**").as("workingTime");
  }
  interceptActionSummary() {
    cy.intercept("GET", "**/dashboard/employees/action-summary").as("actionSummary");
  }
  interceptShortcuts() {
    cy.intercept("GET", "**/dashboard/shortcuts").as("shortcuts");
  }
  interceptSubunit() {
    cy.intercept("GET", "**/dashboard/employees/subunit").as("subunit");
  }
  interceptResetPassword() {
    cy.intercept("POST", "**/auth/requestResetPassword").as("resetPassword");
  }

  // Intercept Wait & Verification Methods
  waitWorkingTime() {
    cy.wait("@workingTime").its("response.statusCode").should("eq", 200);
  }
  verifyActionSummaryNotCalled() {
    cy.get("@actionSummary.all").should("have.length", 0);
  }
  verifyShortcutsNotCalled() {
    cy.get("@shortcuts.all").should("have.length", 0);
  }
  verifySubunitNotCalled() {
    cy.get("@subunit.all").should("have.length", 0);
  }
}

export default new logPage();