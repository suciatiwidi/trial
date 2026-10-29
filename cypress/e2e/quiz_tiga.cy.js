describe ('Fitur Login orangeHRM', () => {
    it('TC_LOG_001 - Login Sukses dengan Credential Valid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='username']").type('Admin');
        cy.get("input[name='password']").type('admin123');
        cy.get("button[type='submit']").click();

        cy.url().should('include', '/dashboard/index');
        cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Dashboard');
    });

    it('TC_LOG_002 - Login Gagal dengan Username Salah', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='username']").type('WrongAdmin');
        cy.get("input[name='password']").type('admin123');
        cy.get("button[type='submit']").click();

        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC_LOG_003 - Login Gagal dengan Password Salah', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='username']").type('Admin');
        cy.get("input[name='password']").type('wrongpass');
        cy.get("button[type='submit']").click();

        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC_LOG_004 - Login Gagal dengan Field Kosong', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("button[type='submit']").click();

        cy.get('.oxd-input-field-error-message').should('have.length', 2);
        cy.get('.oxd-input-field-error-message').each(($el) => {
        expect($el.text()).to.equal('Required');
        });
    });

    it('TC_LOG_005 - Login Gagal Username Kosong', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='password']").type('admin123');
        cy.get("button[type='submit']").click();

        cy.get('.oxd-input-field-error-message').should('have.length', 1);
        cy.get('.oxd-input-field-error-message').should('contain', 'Required');
    });

    it('TC_LOG_006 - Login Gagal Password Kosong', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='username']").type('Admin');
        cy.get("button[type='submit']").click();

        cy.get('.oxd-input-field-error-message').should('have.length', 1);
        cy.get('.oxd-input-field-error-message').should('contain', 'Required');
    });

    it('TC_LOG_007 - Memastikan Input Password Tersembunyi (Masking)', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='password']").type('admin123').should('have.attr', 'type', 'password');
    });

    it('TC_LOG_008 - Navigasi ke Halaman Reset Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.orangehrm-login-forgot-header').click();

        cy.url().should('include', '/auth/requestPasswordResetCode');
        cy.get('.orangehrm-forgot-password-title').should('contain', 'Reset Password');
    });

    it('TC_LOG_009 - Verifikasi Case Sensitivity Username', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='username']").type('admin');
        cy.get("input[name='password']").type('admin123');
        cy.get("button[type='submit']").click();

        cy.url().should('include', '/dashboard/index');
    });

    it('TC_LOG_010 - Verifikasi Case Sensitivity Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='username']").type('Admin');
        cy.get("input[name='password']").type('ADMIN123');
        cy.get("button[type='submit']").click();

        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC_LOG_011 - Tampilan Halaman Login (UI Layout)', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.orangehrm-login-branding').should('be.visible');
        cy.get("input[name='username']").should('be.visible');
        cy.get("input[name='password']").should('be.visible');
        cy.get("button[type='submit']").should('be.visible');
        cy.get('.orangehrm-login-forgot-header').should('be.visible');
    });

    it('TC_LOG_012 - Memeriksa Link Media Sosial', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.orangehrm-login-footer-sm').find('a').each(($el) => {
            cy.wrap($el).should('have.attr', 'href').and('not.be.empty');
            cy.wrap($el).should('have.attr', 'target', '_blank');
        });
    });
});