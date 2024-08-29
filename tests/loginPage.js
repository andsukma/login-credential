const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.emailField = By.name('email'); // Replace with actual locator
        this.passwordField = By.name('password'); // Replace with actual locator
        this.signInButton = By.css('button.btn.bg-gradient-info.w-100.mt-4.mb-0'); // CSS Selector for the "Sign in" button
        this.errorMessageLocator = By.css('label.text.text-danger'); // CSS Selector for alert error message 
    }

    async enterEmail(email) {
        const emailInput = await this.driver.findElement(this.emailField);
        await emailInput.sendKeys(email);
    }

    async enterPassword(password) {
        const passwordInput = await this.driver.findElement(this.passwordField);
        await passwordInput.sendKeys(password);
    }

    async clickSignInButton() {
        const button = await this.driver.findElement(this.signInButton);
        await button.click();
    }
    async getErrorMessageText() {
        const errorMessageElement = await this.driver.findElement(this.errorMessageLocator);
        return await errorMessageElement.getText();
    }

    async isErrorMessageDisplayed() {
        const errorMessageElement = await this.driver.findElement(this.errorMessageLocator);
        return await errorMessageElement.isDisplayed();
    }
}

module.exports = LoginPage;
