import EmpatLoginPage from '../support/empatloginPage.js';
import empatData from '../fixtures/empatData.json'

describe('Fitur Login orangeHRM dengan Page Object Model (POM)', () => {

    it('TC_LOG_001 - Login Sukses dengan Credential Valid', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.login(empatData.validUser.username, empatData.validUser.password);

        cy.url().should('include', '/dashboard/index');
        EmpatLoginPage.elements.dashboardHeader().should('contain', 'Dashboard');
    });

    it('TC_LOG_002 - Login Gagal dengan Username Salah', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.login(empatData.invalidUsername.username, empatData.invalidUsername.password);

        EmpatLoginPage.elements.alertMessage().should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC_LOG_003 - Login Gagal dengan Password Salah', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.login(empatData.invalidPassword.username, empatData.invalidPassword.password);

        EmpatLoginPage.elements.alertMessage().should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC_LOG_004 - Login Gagal dengan Field Kosong', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.clickSubmit();

        EmpatLoginPage.elements.errorMessage().should('have.length', 2);
        EmpatLoginPage.elements.errorMessage().each(($el) => {
            expect($el.text()).to.equal('Required');
        });
    });

    it('TC_LOG_005 - Login Gagal Username Kosong', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.fillPassword(empatData.validUser.password);
        EmpatLoginPage.clickSubmit();

        EmpatLoginPage.elements.errorMessage().should('have.length', 1);
        EmpatLoginPage.elements.errorMessage().should('contain', 'Required');
    });

    it('TC_LOG_006 - Login Gagal Password Kosong', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.fillUsername(empatData.validUser.username);
        EmpatLoginPage.clickSubmit();

        EmpatLoginPage.elements.errorMessage().should('have.length', 1);
        EmpatLoginPage.elements.errorMessage().should('contain', 'Required');
    });

    it('TC_LOG_007 - Memastikan Input Password Tersembunyi (Masking)', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.elements.passwordInput().type(empatData.validUser.password).should('have.attr', 'type', 'password');
    });

    it('TC_LOG_008 - Navigasi ke Halaman Reset Password', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.clickForgotPassword();

        cy.url().should('include', '/auth/requestPasswordResetCode');
        EmpatLoginPage.elements.resetPasswordTitle().should('contain', 'Reset Password');
    });

    it('TC_LOG_009 - Verifikasi Case Sensitivity Username', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.login(empatData.lowercaseUsername.username, empatData.lowercaseUsername.password);

        cy.url().should('include', '/dashboard/index');
    });

    it('TC_LOG_010 - Verifikasi Case Sensitivity Password', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.login(empatData.uppercasePassword.username, empatData.uppercasePassword.password);

        EmpatLoginPage.elements.alertMessage().should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC_LOG_011 - Tampilan Halaman Login (UI Layout)', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.elements.branding().should('be.visible');
        EmpatLoginPage.elements.usernameInput().should('be.visible');
        EmpatLoginPage.elements.passwordInput().should('be.visible');
        EmpatLoginPage.elements.submitButton().should('be.visible');
        EmpatLoginPage.elements.forgotPasswordLink().should('be.visible');
    });

    it('TC_LOG_012 - Memeriksa Link Media Sosial', () => {
        EmpatLoginPage.visit();
        EmpatLoginPage.elements.socialLinks().each(($el) => {
            cy.wrap($el).should('have.attr', 'href').and('not.be.empty');
            cy.wrap($el).should('have.attr', 'target', '_blank');
        });
    });
});