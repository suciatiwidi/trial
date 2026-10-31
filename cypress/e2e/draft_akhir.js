import AkhirLoginPage from '../support/akhirloginPage.js';
import AkhirDirectoryPage from '../support/akhirdirectoryPage.js';
import AkhirRecruitmentPage from '../support/akhirrecruitmentPage.js';
import AkhirIntercepts from '../support/akhirIntercepts.js'

describe('Project Akhir: OrangeHRM Automation Test (Login, Directory, Recruitment)', () => {
  
  // MODUL 1: LOGIN =====
  describe('Modul Login', () => {
    beforeEach(() => {
      cy.fixture('akhirData').then((data) => {
        AkhirLoginPage.visit();
        AkhirLoginPage.login(data.validUser.username, data.validUser.password);
      });
      AkhirIntercepts.interceptDirectory();
      AkhirDirectoryPage.navigateToDirectory();
    });

    it('TC_LOG_001 - Verifikasi Login dengan credentials yang valid', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirLoginPage.login(data.validUser.username, data.validUser.password);
        cy.wait('@loginRequest');
        AkhirLoginPage.verifyDashboardVisible();
      });
    });

    it('TC_LOG_002 - Verifikasi Login dengan username invalid', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirLoginPage.login(data.invalidUser.username, data.invalidUser.password);
        cy.wait('@loginRequest');
        AkhirLoginPage.verifyErrorMessage('Invalid credentials');
      });
    });

    it('TC_LOG_003 - Verifikasi Login dengan password invalid', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirLoginPage.login(data.invalidPassword.username, data.invalidPassword.password);
        cy.wait('@loginRequest');
        AkhirLoginPage.verifyErrorMessage('Invalid credentials');
      });
    });

    it('TC_LOG_004 - Verifikasi Login dengan field username dan password yang kosong', () => {
      AkhirLoginPage.login('', '');
      AkhirLoginPage.verifyRequiredField('Username');
      AkhirLoginPage.verifyRequiredField('Password');
    });

    it('TC_LOG_005 - Verifikasi Password tersembunyi (Masked input)', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirLoginPage.fillPassword(data.validUser.password);
        AkhirLoginPage.verifyPasswordMasked();
      });
    });

    it('TC_LOG_006 - Verifikasi Navigasi Lupa Password (Forgot Password)', () => {
      AkhirLoginPage.clickForgotPassword();
      AkhirLoginPage.verifyResetPasswordPage();
    });

    it('TC_LOG_007 - Verifikasi Case Sensitivity pada Username', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirLoginPage.login(data.lowercaseUser.username, data.lowercaseUser.password);
        cy.wait('@loginRequest');
        AkhirLoginPage.verifyDashboardVisible();
      });
    });

    it('TC_LOG_008 - Verifikasi Case Sensitivity pada Password', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirLoginPage.login(data.uppercasePassword.username, data.uppercasePassword.password);
        cy.wait('@loginRequest');
        AkhirLoginPage.verifyErrorMessage('Invalid credentials');
      });
    });
  });


  // MODUL 2: DIRECTORY =====
  describe('Modul Directory', () => {
    beforeEach(() => {
      cy.fixture('akhirData').then((data) => {
        AkhirLoginPage.visit();
        AkhirLoginPage.login(data.validUser.username, data.validUser.password);
      });
      AkhirIntercepts.interceptDirectory();
      AkhirDirectoryPage.navigateToDirectory();
    });

    it('TC_DIR_001 - Navigasi ke Menu Directory', () => {
      cy.wait('@getDirectory');
      AkhirDirectoryPage.verifyDirectoryPageLoaded();
    });

    it('TC_DIR_002 - Cari Karyawan Berdasarkan Nama Valid', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirDirectoryPage.searchEmployeeByName(data.directoryData.validEmployeeName);
      });
      cy.wait('@getDirectory');
      AkhirDirectoryPage.verifyEmployeeCardVisible();
    });

    it('TC_DIR_003 - Cari Karyawan dengan Nama Tidak Ada', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirDirectoryPage.searchEmployeeByInvalidName(data.directoryData.invalidEmployeeName);
      });
      AkhirDirectoryPage.verifyNoRecordsFound();
    });

    it('TC_DIR_004 - Filter Karyawan Berdasarkan Job Title', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirDirectoryPage.selectJobTitle(data.directoryData.jobTitle);
      });
      cy.wait('@getDirectory');
      AkhirDirectoryPage.verifyEmployeeCardVisible();
    });

    it('TC_DIR_005 - Filter Karyawan Berdasarkan Lokasi', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirDirectoryPage.selectLocation(data.directoryData.location);
      });
      cy.wait('@getDirectory');
      AkhirDirectoryPage.verifyEmployeeCardVisible();
    });

    it('TC_DIR_006 - Filter Kombinasi Job Title dan Lokasi', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirDirectoryPage.selectJobTitle(data.directoryData.jobTitle);
        AkhirDirectoryPage.selectLocation(data.directoryData.location);
      });
      cy.wait('@getDirectory');
      AkhirDirectoryPage.verifyEmployeeCardVisible();
    });

    it('TC_DIR_007 - Reset Filter Pencarian Directory', () => {
      cy.fixture('akhirData').then((data) => {
        AkhirDirectoryPage.searchEmployeeByInvalidName(data.directoryData.invalidEmployeeName);
      });
      AkhirDirectoryPage.clickReset();
      AkhirDirectoryPage.verifyResetSuccess();
    });

    it('TC_DIR_008 - Lihat Informasi Card Karyawan', () => {
      cy.wait('@getDirectory');
      AkhirDirectoryPage.verifyEmployeeCardVisible();
      AkhirDirectoryPage.verifyEmployeeCardDetails();
    });
  });


  // MODUL 3: RECRUITMENT =====
  describe('Modul Recruitment', () => {
    beforeEach(() => {
      cy.fixture('akhirData').then((data) => {
        AkhirLoginPage.visit();
        AkhirLoginPage.login(data.validUser.username, data.validUser.password);
      });
      AkhirIntercepts.interceptRecruitment();
      AkhirRecruitmentPage.navigateToRecruitment();
    });

    it('TC_REC_001 - Navigasi ke Menu Recruitment Candidates', () => {
      cy.wait('@getCandidates');
      AkhirRecruitmentPage.verifyRecruitmentPageLoaded();
      AkhirRecruitmentPage.verifyCandidateTableVisible();
    });

    it('TC_REC_002 - Navigasi ke Tab Vacancies', () => {
      AkhirRecruitmentPage.navigateToVacancies();
      AkhirRecruitmentPage.verifyVacanciesPageLoaded();
    });

    it('TC_REC_003 - Filter Kandidat Berdasarkan Job Title', () => {
      cy.get('.oxd-select-text').first().click();
      cy.get('.oxd-select-dropdown').contains('Software Engineer').click({ force: true });
      cy.get("button[type='submit']").click();
      AkhirRecruitmentPage.verifyCandidateTableVisible();
    });

    it('TC_REC_004 - Filter Kandidat Berdasarkan Status', () => {
      cy.get('.oxd-select-text').eq(1).click();
      cy.get('.oxd-select-dropdown').contains('Application Initiated').click({ force: true });
      cy.get("button[type='submit']").click();
      AkhirRecruitmentPage.verifyCandidateTableVisible();
    });

    it('TC_REC_005 - Buka Form Tambah Kandidat', () => {
      AkhirRecruitmentPage.clickAddButton();
      AkhirRecruitmentPage.verifyAddCandidateFormLoaded();
    });

    it('TC_REC_006 - Tambah Kandidat Baru (Field Wajib)', () => {
      AkhirIntercepts.interceptSaveCandidate();
      AkhirRecruitmentPage.clickAddButton();
      cy.fixture('akhirData').then((data) => {
        AkhirRecruitmentPage.fillCandidateForm(
          data.candidateData.firstName,
          data.candidateData.middleName,
          data.candidateData.lastName,
          data.candidateData.email
        );
        AkhirRecruitmentPage.clickSave();
        cy.wait('@saveCandidate').its('response.statusCode').should('eq', 200);
        AkhirRecruitmentPage.verifyAddCandidateSuccess();
      });
    });

    it('TC_REC_007 - Validasi Field Wajib pada Add Candidate', () => {
      AkhirRecruitmentPage.clickAddButton();
      AkhirRecruitmentPage.clickSave();
      AkhirRecruitmentPage.verifyRequiredValidation();
    });

    it('TC_REC_008 - Reset Filter pada Tab Candidates', () => {
      cy.get("button[type='reset']").click();
      cy.url().should('include', '/recruitment/viewCandidates');
    });
  });
});