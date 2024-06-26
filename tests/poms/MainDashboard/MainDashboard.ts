import { Page } from "@playwright/test";

export default class MainDashboard {
    readonly pageTitle = this.page.locator('.oxd-topbar-header-breadcrumb');
    readonly sidePanel = this.page.locator('.oxd-sidepanel');
    readonly hideSidePanelBtn = this.page.locator('[role="none"]');
    readonly recruitmentBtn = this.page.getByText('Recruitment');


    constructor(private page: Page){};

    async pageLoaded(){
        await this.hideSidePanelBtn.waitFor();
    }

    async goToRecruitmentSection(){
        await this.recruitmentBtn.click();
    }
}