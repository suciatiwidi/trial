class AkhirIntercepts {
  interceptLogin() {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('loginRequest');
  }

  interceptDirectory() {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory').as('getDirectory');
  }

  interceptRecruitment() {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates').as('getCandidates');
  }

  interceptSaveCandidate() {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/148/actions/allowed').as('saveCandidate');
  }
}

export default new AkhirIntercepts();