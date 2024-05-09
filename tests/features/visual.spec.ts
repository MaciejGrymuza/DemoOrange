import { test as base, expect } from '@playwright/test';
import LoginPage from '../poms/LoginPage/LoginPage';
import MainDashboard from '../poms/MainDashboard/MainDashboard';
import { USER_NAME, USER_PWD } from '../data/settingsData';
import { recruitmentPageTitle, pimPageTitle } from '../data/texts';
import RecruitmentPage from '../poms/RecruitmentPage/RecruitmentPage';
import PimPage from '../poms/PimPage/PimPage';

const test = base.extend<{
    loginPage: LoginPage,
    mainDashboard: MainDashboard,
    recruitmentPage: RecruitmentPage,
    pimPage: PimPage
}>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await use(loginPage);
    },
    mainDashboard: async ({ page }, use) => {
        await use(new MainDashboard(page))
    },
    recruitmentPage: async ({page}, use) => {
        await use(new RecruitmentPage(page))
    },
    pimPage: async ({page}, use) => {
        await use(new PimPage(page))
    }
});

test.describe('Visual comparision tests', () => {
    test('Check Recruitment section', async ({loginPage, mainDashboard, recruitmentPage}) => {
        await loginPage.logIn(USER_NAME, USER_PWD);
        await mainDashboard.pageLoaded();
        await mainDashboard.goToRecruitmentSection();
        await recruitmentPage.pageLoaded();
        await expect(recruitmentPage.pageTitle).toHaveText(recruitmentPageTitle);
        
        const screenshotRecr = await recruitmentPage.newCandidateTable.screenshot();

        expect(screenshotRecr).toMatchSnapshot();
    })
    
    test.only('Check PIM section table', async ({loginPage, mainDashboard, pimPage}) => {
        await loginPage.logIn(USER_NAME, USER_PWD);
        await mainDashboard.pageLoaded();
        await mainDashboard.goToPIMSection();
        await expect(pimPage.pagetitle).toHaveText(pimPageTitle);

        const screenShotPim = await pimPage.employeeTable.screenshot();

        expect(screenShotPim).toMatchSnapshot();
    })
});