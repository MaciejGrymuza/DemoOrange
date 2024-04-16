import { Page } from "@playwright/test";
import { baseURL } from "../../data/settingsData";

export default class LoginPage {
    readonly userName = this.page.getByPlaceholder('Username');
    readonly password= this.page.getByPlaceholder('password');
    readonly loginBtn= this.page.getByRole('button', {name:'Login'});
    readonly credentials= this.page.getByText('Username : Admin');
    readonly credentialsError= this.page.getByRole('alert');
    readonly userNameLabel = this.page.locator('label.oxd-label').nth(0);
    readonly pwdLabel = this.page.locator('label.oxd-label').nth(1);

    constructor(private page: Page){}

    async goTo(){
        await this.page.goto(baseURL!);
        await this.pageLoaded();
        await this.page.waitForLoadState("domcontentloaded");

    }

    async pageLoaded(){
        await this.credentials.waitFor();
        await this.loginBtn.waitFor();
    }
        
    async logIn(username:string, pwd: string){
        await this.userName.fill(username);
        await this.password.fill(pwd);
        await this.loginBtn.click();
    }
}