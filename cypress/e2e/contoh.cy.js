import halamanLogin from '../support/loginPage'
import loginData from '../fixtures/loginData.json'

describe ('Verifikasi Fungsi Login', () => {
    it('TC001-Login dengan username valid & password valid', () => { 
        halamanLogin.kunjungiHalaman()
        halamanLogin.masukanUsername(loginData.usernameValid)
        halamanLogin.masukanPassword(loginData.passwordValid)
        halamanLogin.klikTombolLogin()
        halamanLogin.verifikasiLoginBerhasil()
    })
    it('TC002-Login dengan username invalid & password invalid', () => { 
        halamanLogin.kunjungiHalaman()
        halamanLogin.masukanUsername(loginData.usernameInvalid)
        halamanLogin.masukanPassword(loginData.passwordInvalid)
        halamanLogin.klikTombolLogin()
        halamanLogin.verifikasiLoginBerhasil()
    })
})