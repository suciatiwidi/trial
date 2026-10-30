class AkhirDirectoryPage {
  // Elements / Locators
  headerTitle = ".oxd-topbar-header-breadcrumb-module";
  employeeNameInput = "input[placeholder='Type for hints...']";
  autocompleteOption = ".oxd-autocomplete-option";
  jobTitleDropdown = ".oxd-select-text";
  selectDropdownOptions = ".oxd-select-dropdown";
  searchButton = "button[type='submit']";
  resetButton = "button[type='reset']";
  employeeCard = ".oxd-sheet";

  // Actions
  navigateToDirectory() {
    cy.contains('.oxd-main-menu-item--name', 'Directory', { timeout: 10000 }).should('be.visible').click();
  }

  searchEmployeeByName(name) {
    cy.get(this.employeeNameInput, { timeout: 10000 }).should('be.visible').type(name);
    cy.get(this.autocompleteOption, { timeout: 10000 }).contains(name).click();
    cy.get(this.searchButton).click();
  }

  searchEmployeeByInvalidName(name) {
    cy.get(this.employeeNameInput, { timeout: 10000 }).should('be.visible').type(name);
    cy.get(this.searchButton).click();
  }

  selectJobTitle(jobTitle) {
  cy.get(this.jobTitleDropdown, { timeout: 10000 }).first().click();
  // Tambahkan timeout pada contains dropdown options
  cy.get(this.selectDropdownOptions, { timeout: 10000 }).contains(jobTitle).click();
  cy.get(this.searchButton).click();
}

  selectLocation(location) {
    cy.get(this.jobTitleDropdown, { timeout: 10000 }).eq(1).click();
    cy.get(this.selectDropdownOptions).contains(location).click();
    cy.get(this.searchButton).click();
  }

  clickSearch() {
    cy.get(this.searchButton).click();
  }

  clickReset() {
    cy.get(this.resetButton).click();
  }

  // Assertions
  verifyDirectoryPageLoaded() {
    cy.url().should('include', '/directory/viewDirectory');
    cy.get(this.headerTitle, { timeout: 10000 }).should('be.visible').and('contain', 'Directory');
  }

  verifyEmployeeCardVisible() {
    cy.get('.oxd-sheet', { timeout: 10000 }).should('have.length.at.least', 1).and('be.visible');
  }

  verifyNoRecordsFound() {
    cy.contains('.oxd-text', 'No Records Found', { timeout: 10000 }).should('be.visible');
  }

  verifyResetSuccess() {
    cy.get(this.employeeNameInput, { timeout: 10000 }).should('have.value', '');
  }

  verifyEmployeeCardDetails() {
    cy.get(this.employeeCard, { timeout: 10000 }).first().within(() => {
      cy.get('img').should('be.visible');
      cy.get('.oxd-sheet-text, p').should('not.be.empty');
    });
  }
}

export default new AkhirDirectoryPage();