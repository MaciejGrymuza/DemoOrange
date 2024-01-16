import { test, expect, Page } from '@playwright/test';
import LoginPage from '../poms/LoginPage/LoginPage';
import MainDashboard from '../poms/MainDashboard/MainDashboard';
import { userName, userPwd } from '../data';


test.describe('Log in test suite', () => {
    test('Log in to the app', async ({page}) => {
        const loginPage = new LoginPage(page);
        const mainDashboard = new MainDashboard(page);

        await loginPage.goTo();
        await loginPage.pageLoaded();
        await loginPage.fillUsername(userName);
        await loginPage.fillPassword(userPwd);
        await loginPage.logIn();

        await mainDashboard.pageLoaded();
    } )
})