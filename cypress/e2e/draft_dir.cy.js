import LogPage from '../support/logPage.js';
import DirPage from '../support/dirPage.js';
import dirData from '../fixtures/dirData.json'

describe('Fitur Directory OrangeHRM dengan Page Object Model (Tanpa beforeEach)', () => {

    // Helper function untuk melakukan login dan navigasi mandiri ke halaman directory
    const loginAndGoToDirectory = () => {
        DirPage.setupDirectoryIntercepts();
        LogPage.visit();
        LogPage.login(dirData.validUser.username, dirData.validUser.password);
        cy.url().should('include', '/dashboard/index');
        DirPage.navigateToDirectory();
    };

    it('TC_DIR_001 - Navigasi ke Menu Directory', () => {
        loginAndGoToDirectory();
        DirPage.elements.breadcrumbModule().should('have.text', 'Directory');
        DirPage.elements.tableFilter().should('be.visible');
    });

    it('TC_DIR_002 - Cari Karyawan Berdasarkan Nama Valid', () => {
        loginAndGoToDirectory();
        DirPage.searchByEmployeeName(dirData.directory.validEmployee);
        DirPage.elements.container().should('be.visible');
        DirPage.elements.cards().should('have.length.at.least', 1);
        DirPage.elements.cardHeader().first().should('contain.text', dirData.directory.validEmployee);
    });

    it('TC_DIR_003 - Cari Karyawan dengan Nama Tidak Ada', () => {
        loginAndGoToDirectory();
        DirPage.searchByInvalidName(dirData.directory.invalidEmployee);
        DirPage.elements.toastMessage()
            .should('be.visible')
            .and('contain.text', 'No Records Found');
    });

    it('TC_DIR_004 - Filter Karyawan Berdasarkan Job Title', () => {
        loginAndGoToDirectory();
        DirPage.filterByJobTitle(dirData.directory.jobTitle);
        DirPage.elements.container().should('be.visible');
        DirPage.elements.cards().each(($card) => {
            cy.wrap($card).should('contain.text', dirData.directory.jobTitle);
        });
    });

    it('TC_DIR_005 - Filter Karyawan Berdasarkan Lokasi', () => {
        loginAndGoToDirectory();
        DirPage.filterByLocation();
        DirPage.elements.container().should('be.visible');
        DirPage.elements.cards().should('have.length.at.least', 1);
    });

    it('TC_DIR_006 - Filter Kombinasi Job Title dan Location', () => {
        loginAndGoToDirectory();
        DirPage.filterByCombination();
        DirPage.elements.container().should('be.visible');
    });

    it('TC_DIR_007 - Reset Filter Pencarian Directory', () => {
        loginAndGoToDirectory();
        DirPage.elements.employeeInput().type(dirData.directory.validEmployee);
        DirPage.resetFilter();
        DirPage.elements.employeeInput().should('have.value', '');
    });

    it('TC_DIR_008 - Lihat Informasi Card Karyawan', () => {
        loginAndGoToDirectory();
        DirPage.elements.submitButton().click();
        cy.wait('@getDirectoryEmployees');
        DirPage.elements.cards().first().within(() => {
            DirPage.elements.cardHeader().should('be.visible');
            cy.get('.oxd-text').should('exist');
            cy.get('img').should('be.visible');
        });
    });

    it('TC_DIR_009 - Menyembunyikan/Menampilkan Sidebar di Directory', () => {
        loginAndGoToDirectory();
        DirPage.toggleSidebar();
        DirPage.elements.sidepanel().should('have.class', 'toggled');
        
        DirPage.toggleSidebar();
        DirPage.elements.sidepanel().should('not.have.class', 'toggled');
    });

    it('TC_DIR_010 - Memastikan Auto-suggest Nama Karyawan', () => {
        loginAndGoToDirectory();
        DirPage.triggerAutocomplete(dirData.directory.searchChar);
        DirPage.elements.autocompleteDropdown()
            .should('be.visible')
            .and('children')
            .should('have.length.at.least', 1);
    });

    it('TC_DIR_011 - Pencarian Tanpa Memilih Filter', () => {
        loginAndGoToDirectory();
        DirPage.resetFilter();
        DirPage.elements.submitButton().click();
        cy.wait('@getDirectoryEmployees');
        DirPage.elements.container().should('be.visible');
        DirPage.elements.cards().should('have.length.at.least', 1);
    });

    it('TC_DIR_012 - Memeriksa Tampilan Foto Karyawan', () => {
        loginAndGoToDirectory();
        DirPage.elements.submitButton().click();
        cy.wait('@getDirectoryEmployees');
        DirPage.elements.cardImage()
            .first()
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
    });
});