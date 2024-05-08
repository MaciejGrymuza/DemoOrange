import { Page } from "@playwright/test";

export default class RecruitmentPage {
    readonly pageTitle = this.page.locator('.oxd-topbar span').nth(0);

    constructor(private page: Page){};

    async pageLoaded(){
        await this.pageTitle.waitFor();
    }
}