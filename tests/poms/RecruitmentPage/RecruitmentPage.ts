import { Page } from "@playwright/test";

export default class RecruitmentPage {
    readonly pageTitle = this.page.locator('.oxd-topbar span').nth(0);
    readonly newCandidateTable = this.page.locator('div.oxd-table-filter');

    constructor(private page: Page){};

    async pageLoaded(){
        await this.pageTitle.waitFor();
    }
}