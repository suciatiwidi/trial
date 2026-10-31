class dirPage {
  // Navigasi
  clickDirectoryMenu() {
    cy.contains("Directory").click();
  }
  directoryUrlValidation() {
    cy.url().should("include", "/viewDirectory");
  }

  // Employee Name Field
  typeEmployeeName(employeeName) {
    cy.get("input[placeholder='Type for hints...']").type(employeeName);
  }
  selectEmployeeSuggestion(employeeName) {
    cy.get(".oxd-autocomplete-dropdown").contains(employeeName).click();
  }
  searchEmployeeByName(employeeName) {
    this.typeEmployeeName(employeeName);
    this.selectEmployeeSuggestion(employeeName);
  }
  verifyNoEmployeeSuggestion() {
    cy.get(".oxd-autocomplete-option").should("contain", "No Records Found");
  }

  // Job Title Dropdown
  openJobTitleDropdown() {
    cy.get(".oxd-select-text").eq(0).click();
  }
  selectJobTitle(jobTitle) {
    this.openJobTitleDropdown();
    cy.contains(".oxd-select-option", jobTitle).click();
  }

  // Location Dropdown
  openLocationDropdown() {
    cy.get(".oxd-select-text").eq(1).click();
  }
  selectLocation(location) {
    this.openLocationDropdown();
    cy.contains(".oxd-select-option", location).click();
  }

  // Buttons
  clickSearchBtn() {
    cy.get("button[type='submit']").click();
  }
  clickResetBtn() {
    cy.contains("button", "Reset").click();
  }

  // Search Results & Validation
  verifySearchResultContains(employeeName) {
    cy.get(".oxd-sheet").should("contain", employeeName);
  }
  verifyNoRecordsFound() {
    cy.contains("No Records Found").should("be.visible");
  }
  verifyDefaultRecordsExist() {
    cy.get(".oxd-sheet").should("have.length.greaterThan", 0);
  }

  // Intercept Methods
  interceptDefaultEmployeeList() {
    cy.intercept("GET", "**/api/v2/directory/employees?limit=14&offset=0").as("defaultEmployeeList");
  }
  interceptEmployeeByName() {
    cy.intercept("GET", "**/api/v2/directory/employees?limit=14&offset=0&empNumber=*").as("employeeByName");
  }
  interceptEmployeeByJobTitle() {
    cy.intercept("GET", "**/api/v2/directory/employees?limit=14&offset=0&jobTitleId=*").as("employeeByJobTitle");
  }
  interceptEmployeeByLocation() {
    cy.intercept("GET", "**/api/v2/directory/employees?limit=14&offset=0&locationId=*").as("employeeByLocation");
  }
  interceptEmployeeCombinedFilter() {
    cy.intercept("GET", "**/api/v2/directory/employees**").as("employeeCombinedFilter");
  }

  // Intercept Wait Methods
  waitDefaultEmployeeList() {
    cy.wait("@defaultEmployeeList").its("response.statusCode").should("eq", 200);
  }
  waitEmployeeByName() {
    cy.wait("@employeeByName").its("response.statusCode").should("eq", 200);
  }
  waitEmployeeByJobTitle() {
    cy.wait("@employeeByJobTitle").its("response.statusCode").should("eq", 200);
  }
  waitEmployeeByLocation() {
    cy.wait("@employeeByLocation").its("response.statusCode").should("eq", 200);
  }
  waitEmployeeCombinedFilterContains(paramKeys) {
    cy.wait("@employeeCombinedFilter").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      paramKeys.forEach((key) => {
        expect(interception.request.url).to.include(key);
      });
    });
  }
}

export default new dirPage();