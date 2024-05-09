import { Page } from "@playwright/test";

export default class MainDashboard {
    readonly pageTitle = this.page.locator('.oxd-topbar-header-breadcrumb');
    readonly sidePanel = this.page.locator('.oxd-sidepanel');
    readonly hideSidePanelBtn = this.page.locator('[role="none"]');
    readonly recruitmentSectionBtn = this.page.getByText('Recruitment');
    readonly pimSectionBtn = this.page.getByText('PIM');


    constructor(private page: Page){};

    async pageLoaded(){
        await this.hideSidePanelBtn.waitFor();
    }

    async goToRecruitmentSection(){
        await this.recruitmentSectionBtn.click();
    }

    async goToPIMSection(){
        await this.pimSectionBtn.click();
    }
}