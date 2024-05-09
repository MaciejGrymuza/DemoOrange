import {Page} from "@playwright/test";

export default class PimPage {
    readonly pagetitle = this.page.locator('span.oxd-topbar-header-breadcrumb');
    readonly employeeTable = this.page.locator('div.oxd-table-filter');


    constructor (private page: Page) {};

    async loadPage(){
        await this.pagetitle.waitFor();
    }
}