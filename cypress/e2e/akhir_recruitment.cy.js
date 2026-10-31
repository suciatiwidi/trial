import logPage from "../support/logPage";
import recPage from "../support/recPage";
import recData from "../fixtures/recData.json";

describe("REC_SC_001 - REC_SC_008 Module Recruitment Verification", () => {
  beforeEach(() => {
    logPage.login();
  });

  it("TC_REC_001 Navigasi ke Menu Recruitment Candidates", () => {
    recPage.interceptDefaultCandidateList();
    recPage.clickRecruitmentMenu();
    recPage.recruitmentUrlValidation();
    recPage.waitDefaultCandidateList();
  });

  it("TC_REC_002 Navigasi ke Tab Vacancies", () => {
    recPage.clickRecruitmentMenu();
    recPage.recruitmentUrlValidation();
    recPage.clickVacanciesTab();
    recPage.clickCandidatesTab();
  });

  it("TC_REC_003 Filter Kandidat Berdasarkan Job Title", () => {
    recPage.clickRecruitmentMenu();
    recPage.recruitmentUrlValidation();
    recPage.interceptCandidateByJobTitle();
    recPage.selectJobTitle(recData.jobTitle);
    recPage.clickSearchBtn();
    recPage.waitCandidateByJobTitle();
  });

  it("TC_REC_004 Filter Kandidat Berdasarkan Hiring Manager", () => {
    recPage.clickRecruitmentMenu();
    recPage.recruitmentUrlValidation();
    recPage.interceptCandidateByHiringManager();
    recPage.selectHiringManager(recData.hiringManager);
    recPage.clickSearchBtn();
    recPage.waitCandidateByHiringManager();
  });

  it("TC_REC_005 Filter Kandidat Berdasarkan Status", () => {
    recPage.clickRecruitmentMenu();
    recPage.recruitmentUrlValidation();
    recPage.interceptCandidateByStatus();
    recPage.selectStatus(recData.status);
    recPage.clickSearchBtn();
    recPage.waitCandidateByStatus();
  });

  it("TC_REC_006 Buka Form Tambah Kandidat", () => {
    recPage.clickRecruitmentMenu();
    recPage.recruitmentUrlValidation();
    recPage.clickAddBtn();
    recPage.addCandidateUrlValidation();
  });

  it("TC_REC_007 Tambah Kandidat Baru (Field Wajib)", () => {
    recPage.clickRecruitmentMenu();
    recPage.recruitmentUrlValidation();
    recPage.clickAddBtn();
    recPage.addCandidateUrlValidation();
    recPage.fillCandidateDetails(
      recData.firstName,
      recData.middleName,
      recData.lastName,
      recData.email
    );
    recPage.interceptSaveCandidate();
    recPage.clickSaveBtn();
    recPage.waitSaveCandidate();
    recPage.verifyCandidateSaved();
  });

  it("TC_REC_008 Lihat Detail Profil Kandidat", () => {
    recPage.interceptDefaultCandidateList();
    recPage.clickRecruitmentMenu();
    recPage.recruitmentUrlValidation();
    recPage.waitDefaultCandidateList();
    recPage.clickFirstViewCandidate();
    recPage.verifyCandidateProfileVisible();
  });
});