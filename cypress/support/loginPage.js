class halamanLogin {
    kunjungiHalaman(){
        cy.visit('https://www.saucedemo.com')
    }
    masukanUsername(){
        cy.get('#user-name').type('standard_user')
    }
    masukanPassword(){
      cy.get('#password').type('secret_sauce')  
    }
    klikTombolLogin(){
        cy.get('.btn_action').click()
    }
    verifikasiLoginBerhasil(){
        cy.url().should('include', 'inventory')
    }
}

 export default new halamanLogin()