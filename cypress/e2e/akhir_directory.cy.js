import logPage from "../support/logPage";
import dirPage from "../support/dirPage";
import dirData from "../fixtures/dirData.json";

describe("DIR_SC_001 - DIR_SC_008 Module Directory Verification", () => {
  beforeEach(() => {
    logPage.login();
  });

  it("TC_DIR_001 Navigasi ke Menu Directory", () => {
    dirPage.interceptDefaultEmployeeList();
    dirPage.clickDirectoryMenu();
    dirPage.waitDefaultEmployeeList();
    dirPage.directoryUrlValidation();
  });

  it("TC_DIR_002 Cari Karyawan Berdasarkan Nama Valid", () => {
    dirPage.clickDirectoryMenu();
    dirPage.directoryUrlValidation();
    dirPage.interceptEmployeeByName();
    dirPage.searchEmployeeByName(dirData.validEmployeeName);
    dirPage.clickSearchBtn();
    dirPage.waitEmployeeByName();
    dirPage.verifySearchResultContains(dirData.validEmployeeName);
  });

  it("TC_DIR_003 Cari Karyawan dengan Nama Tidak Ada", () => {
    dirPage.clickDirectoryMenu();
    dirPage.directoryUrlValidation();
    dirPage.typeEmployeeName(dirData.invalidEmployeeName);
    dirPage.verifyNoEmployeeSuggestion();
  });

  it("TC_DIR_004 Filter Karyawan Berdasarkan Job Title", () => {
    dirPage.clickDirectoryMenu();
    dirPage.directoryUrlValidation();
    dirPage.interceptEmployeeByJobTitle();
    dirPage.selectJobTitle(dirData.jobTitle);
    dirPage.clickSearchBtn();
    dirPage.waitEmployeeByJobTitle();
  });

  it("TC_DIR_005 Filter Karyawan Berdasarkan Lokasi", () => {
    dirPage.clickDirectoryMenu();
    dirPage.directoryUrlValidation();
    dirPage.interceptEmployeeByLocation();
    dirPage.selectLocation(dirData.location);
    dirPage.clickSearchBtn();
    dirPage.waitEmployeeByLocation();
  });

  it("TC_DIR_006 Filter Kombinasi Job Title dan Location", () => {
    dirPage.clickDirectoryMenu();
    dirPage.directoryUrlValidation();
    dirPage.selectJobTitle(dirData.jobTitle);
    dirPage.selectLocation(dirData.location);
    dirPage.interceptEmployeeCombinedFilter();
    dirPage.clickSearchBtn();
    dirPage.waitEmployeeCombinedFilterContains(["jobTitleId", "locationId"]);
  });

  it("TC_DIR_007 Reset Filter Pencarian Directory", () => {
    dirPage.clickDirectoryMenu();
    dirPage.directoryUrlValidation();
    dirPage.selectJobTitle(dirData.jobTitle);
    dirPage.clickResetBtn();
    cy.get("input[placeholder='Type for hints...']").eq(0).should("have.value", "");
  });

  it("TC_DIR_008 Pencarian Tanpa Memilih Filter", () => {
    dirPage.clickDirectoryMenu();
    dirPage.directoryUrlValidation();
    dirPage.interceptDefaultEmployeeList();
    dirPage.clickSearchBtn();
    dirPage.waitDefaultEmployeeList();
    dirPage.verifyDefaultRecordsExist();
  });
});