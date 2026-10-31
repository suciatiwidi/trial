import logPage from "../support/logPage";
import logData from "../fixtures/logData.json";

describe("LOG_SC_001 - LOG_SC_008 Module Login Verification", () => {
  beforeEach(() => {
    logPage.visitUrl();
  });

  it("TC_LOG_001 Login Sukses dengan Credential Valid", () => {
    logPage.interceptTimeAtWork();
    logPage.inputUsername(logData.validUsername);
    logPage.inputPassword(logData.validPassword);
    logPage.clickLoginBtn();
    logPage.waitWorkingTime();
    logPage.dashboardUrlValidation();
  });

  it("TC_LOG_002 Login Gagal dengan Username Salah", () => {
    logPage.interceptActionSummary();
    logPage.inputUsername(logData.invalidUsername);
    logPage.inputPassword(logData.validPassword);
    logPage.clickLoginBtn();
    logPage.loginAlertValidation(logData.invalidAlert);
    logPage.verifyActionSummaryNotCalled();
    logPage.loginUrlValidation();
  });

  it("TC_LOG_003 Login Gagal dengan Password Salah", () => {
    logPage.interceptShortcuts();
    logPage.inputUsername(logData.validUsername);
    logPage.inputPassword(logData.invalidPassword);
    logPage.clickLoginBtn();
    logPage.loginAlertValidation(logData.invalidAlert);
    logPage.verifyShortcutsNotCalled();
    logPage.loginUrlValidation();
  });

  it("TC_LOG_004 Login Gagal dengan Field Kosong", () => {
    logPage.interceptSubunit();
    logPage.clickLoginBtn();
    logPage.bothRequiredAlert();
    logPage.verifySubunitNotCalled();
    logPage.loginUrlValidation();
  });

  it("TC_LOG_005 Login Gagal Username Kosong", () => {
    logPage.inputPassword(logData.validPassword);
    logPage.clickLoginBtn();
    logPage.requiredFieldValidation(logData.requiredAlert);
    logPage.loginUrlValidation();
  });

  it("TC_LOG_006 Login Gagal Password Kosong", () => {
    logPage.inputUsername(logData.validUsername);
    logPage.clickLoginBtn();
    logPage.requiredFieldValidation(logData.requiredAlert);
    logPage.loginUrlValidation();
  });

  it("TC_LOG_007 Memastikan Input Password Tersembunyi", () => {
    logPage.inputPassword(logData.validPassword);
    logPage.passwordFieldValidation();
  });

  it("TC_LOG_008 Navigasi ke Halaman Reset Password", () => {
    logPage.clickForgotPassword();
    logPage.forgotPassUrlValidation();
  });
});