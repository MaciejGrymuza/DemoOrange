import { test as base, expect } from '@playwright/test';
import LoginPage from '../poms/LoginPage/LoginPage';
import MainDashboard from '../poms/MainDashboard/MainDashboard';
import { USER_NAME, USER_PWD } from '../data/settingsData';
import { recruitmentPageTitle } from '../data/texts';
import RecruitmentPage from '../poms/RecruitmentPage/RecruitmentPage';

const test = base.extend<{
    loginPage: LoginPage,
    mainDashboard: MainDashboard,
    recruitmentPage: RecruitmentPage
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
    }
});

test.describe('Visual comparision tests', () => {
    test.only('Check Recruitment section', async ({loginPage, mainDashboard, recruitmentPage}) => {
        await loginPage.logIn(USER_NAME, USER_PWD);
        await mainDashboard.pageLoaded();
        await mainDashboard.goToRecruitmentSection();
        await recruitmentPage.pageLoaded();
        await expect(recruitmentPage.pageTitle).toHaveText(recruitmentPageTitle);
    }
)
});