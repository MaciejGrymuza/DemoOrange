import { test as base, expect } from '@playwright/test';
import LoginPage from '../poms/LoginPage/LoginPage';
import MainDashboard from '../poms/MainDashboard/MainDashboard';
import { USER_NAME, USER_PWD } from '../data/settingsData';
import { pwdLabelTxt, userNameLabelTxt, wrongCredentialsError } from '../data/texts';

const test = base.extend<{
    loginPage: LoginPage,
    mainDashboard: MainDashboard
}>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await use(loginPage);
    },
    mainDashboard: async ({ page }, use) => {
        await use(new MainDashboard(page))
    }
});

test.describe('Log in test suite', () => {
    test('Log in to the app', async ({loginPage, mainDashboard}) => {
        
        await expect(loginPage.userNameLabel).toHaveText(userNameLabelTxt);
        await expect(loginPage.pwdLabel).toHaveText(pwdLabelTxt);
        await loginPage.logIn(USER_NAME, USER_PWD);

        await mainDashboard.pageLoaded();
    } )

    test('Try to log in with a wrong password', async ({loginPage}) => {
        await loginPage.goTo();
        await loginPage.logIn(USER_NAME, 'WrongPassword');

        await expect(loginPage.credentialsError).toBeVisible();
        await expect(loginPage.credentialsError).toHaveText(wrongCredentialsError);
    })

    test('Try to log in with a wrong user name', async({loginPage})=> {
        await loginPage.goTo();
        await loginPage.logIn('Wrong Name', USER_PWD);
        await expect(loginPage.credentialsError).toBeVisible();
        await expect(loginPage.credentialsError).toHaveText(wrongCredentialsError);
    })
})