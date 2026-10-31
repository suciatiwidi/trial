class recPage {
  // Navigasi
  clickRecruitmentMenu() {
    cy.contains("Recruitment").click();
  }
  recruitmentUrlValidation() {
    cy.url().should("include", "/recruitment");
  }
  clickVacanciesTab() {
    cy.contains("Vacancies").click();
  }
  vacanciesUrlValidation() {
    cy.url().should("include", "/viewVacancies");
  }
  clickCandidatesTab() {
    cy.contains("Candidates").click();
  }

  // Dropdown Field
  openDropdown(index) {
    cy.get(".oxd-select-text").eq(index).click();
  }
  selectJobTitle(jobTitle) {
    this.openDropdown(0);
    cy.get(".oxd-select-option").contains(jobTitle).click();
  }
  selectHiringManager(hiringManager) {
    this.openDropdown(2);
    cy.get(".oxd-select-option").contains(hiringManager).click();
  }
  selectStatus(status) {
    this.openDropdown(3);
    cy.get(".oxd-select-option").contains(status).click();
  }

  // Buttons
  clickSearchBtn() {
    cy.get("button[type='submit']").click();
  }
  clickAddBtn() {
    cy.contains("button", "Add").click();
  }
  clickSaveBtn() {
    cy.get("button[type='submit']").click();
  }

  // Form Add Candidate
  addCandidateUrlValidation() {
    cy.url().should("include", "/addCandidate");
  }
  fillCandidateDetails(firstName, middleName, lastName, email) {
    cy.get('[name="firstName"]').type(firstName);
    cy.get('[name="middleName"]').type(middleName);
    cy.get('[name="lastName"]').type(lastName);
    cy.get(".oxd-input-group").contains("Email").parent().next().find("input").type(email);
  }

  // Detail View & Profile
  clickFirstViewCandidate() {
    cy.get(".oxd-table-cell-actions button").first().click();
  }
  verifyCandidateProfileVisible() {
    cy.url().should("include", "/addCandidate");
    cy.get(".orangehrm-card-container").should("be.visible");
  }
  verifyCandidateSaved() {
    cy.url().should("include", "/addCandidate");
    cy.get(".oxd-text--h6").should("contain", "Application Stage");
  }

  // Intercept Methods
  interceptDefaultCandidateList() {
    cy.intercept("GET", "**/api/v2/recruitment/candidates**").as("defaultCandidateList");
  }
  interceptCandidateByJobTitle() {
    cy.intercept("GET", "**/api/v2/recruitment/candidates**jobTitleId=*").as("candidateByJobTitle");
  }
  interceptCandidateByHiringManager() {
    cy.intercept("GET", "**/api/v2/recruitment/candidates**hiringManagerId=*").as("candidateByHiringManager");
  }
  interceptCandidateByStatus() {
    cy.intercept("GET", "**/api/v2/recruitment/candidates**status=*").as("candidateByStatus");
  }
  interceptSaveCandidate() {
    cy.intercept("POST", "**/api/v2/recruitment/candidates").as("saveCandidate");
  }

  // Intercept Wait Methods
  waitDefaultCandidateList() {
    cy.wait("@defaultCandidateList").its("response.statusCode").should("eq", 200);
  }
  waitCandidateByJobTitle() {
    cy.wait("@candidateByJobTitle").its("response.statusCode").should("eq", 200);
  }
  waitCandidateByHiringManager() {
    cy.wait("@candidateByHiringManager").its("response.statusCode").should("eq", 200);
  }
  waitCandidateByStatus() {
    cy.wait("@candidateByStatus").its("response.statusCode").should("eq", 200);
  }
  waitSaveCandidate() {
    cy.wait("@saveCandidate").its("response.statusCode").should("eq", 200);
  }
}

export default new recPage();