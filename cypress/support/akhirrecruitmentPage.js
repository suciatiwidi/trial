class AkhirRecruitmentPage {
  // Elements / Locators
  headerTitle = ".oxd-topbar-header-breadcrumb-module";
  vacanciesTab = ".oxd-topbar-body-nav-tab-item";
  addButton = "button.oxd-button--secondary";
  firstNameInput = "input[name='firstName']";
  middleNameInput = "input[name='middleName']";
  lastNameInput = "input[name='lastName']";
  emailInput = "input[placeholder='Type here']";
  saveButton = "button[type='submit']";
  requiredValidation = ".oxd-input-field-error-message";
  candidateTableBody = ".oxd-table-body";

  // Actions
  navigateToRecruitment() {
    cy.contains('.oxd-main-menu-item--name', 'Recruitment', { timeout: 10000 }).should('be.visible').click();
  }

  navigateToVacancies() {
    cy.contains(this.vacanciesTab, 'Vacancies', { timeout: 10000 }).should('be.visible').click();
  }

  clickAddButton() {
    cy.contains(this.addButton, 'Add', { timeout: 10000 }).should('be.visible').click();
  }

  fillCandidateForm(firstName, middleName, lastName, email) {
    cy.get(this.firstNameInput, { timeout: 10000 }).should('be.visible').type(firstName);
    cy.get(this.middleNameInput).type(middleName);
    cy.get(this.lastNameInput).type(lastName);
    // Mengisi email field (pilih elemen kedua yang bertipe placeholder Type here jika ada)
    cy.get(this.emailInput).last().type(email);
  }

  clickSave() {
    cy.get(this.saveButton).click();
  }

  // Assertions
  verifyRecruitmentPageLoaded() {
    cy.url().should('include', '/recruitment/viewCandidates');
    cy.get(this.headerTitle, { timeout: 10000 }).should('be.visible').and('contain', 'Recruitment');
  }

  verifyVacanciesPageLoaded() {
    cy.url().should('include', '/recruitment/viewJobVacancy');
    cy.contains('.oxd-text, h6', 'Vacancies', { timeout: 10000 }).should('be.visible');
  }

  verifyAddCandidateFormLoaded() {
    cy.url().should('include', '/recruitment/addCandidate');
    cy.get(this.firstNameInput, { timeout: 10000 }).should('be.visible');
  }

  verifyAddCandidateSuccess() {
    // Mengecek URL atau status/stage kandidat
    cy.url({ timeout: 10000 }).should('include', '/recruitment/');
    cy.get('body').should('contain.text', 'Status');
  }

  verifyRequiredValidation() {
    cy.contains('.oxd-input-field-error-message, span', 'Required', { timeout: 10000 })
    .should('be.visible');
}

  verifyCandidateTableVisible() {
    cy.get(this.candidateTableBody, { timeout: 10000 }).should('exist');
}
}

export default new AkhirRecruitmentPage();