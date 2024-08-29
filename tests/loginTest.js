const { Builder, until } = require('selenium-webdriver');
const { expect } = require('chai');
const LoginPage = require(loginPage()); // Import the Page Object Model

describe('Login Tests', function() {
    let driver;
    let loginPage;

    this.timeout(30000); // Increase the timeout to handle slow operations

    beforeEach(async function() {
        driver = new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver); // Initialize Page Object
    });

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    async function takeScreenshot(testName) {
        const screenshot = await driver.takeScreenshot();
        const filePath = `./screenshots/${testName}.png`;
        require('fs').writeFileSync(filePath, screenshot, 'base64');
        console.log(`Screenshot saved to ${filePath}`);
    }
    const path = require('path');
    const fs = require('fs');

// Create a function to take screenshots
    async function takeScreenshot(driver, fileName) {
    const screenshot = await driver.takeScreenshot();
    const screenshotsDir = path.join(__dirname, 'screenshots');

    // Ensure the screenshots directory exists
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
    }

    // Ensure the fileName is a string
    if (typeof fileName !== 'string') {
        throw new Error('fileName must be a string');
    }

    const filePath = path.join(screenshotsDir, `${fileName}.png`);
    fs.writeFileSync(filePath, screenshot, 'base64');
}

    it('should success login with valid credentials', async function() {
            await driver.get('https://lapor.folkatech.com/');

            await loginPage.enterEmail('admin@example.com'); // Replace with actual valid username
            await loginPage.enterPassword('password'); // Replace with actual valid password
            await loginPage.clickSignInButton(); // Click the "Sign in" button

            // Wait until the URL contains the expected path
            await driver.wait(async function() {
                const currentUrl = await driver.getCurrentUrl();
                return currentUrl.includes('/admin/dashboard');
            }, 15000);

            // Verify the URL
            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).to.equal('https://lapor.folkatech.com/admin/dashboard');
    });
    
    it('should fail login with invalid credentials', async function() {
        try {
            await driver.get('https://lapor.folkatech.com/');
            await loginPage.enterEmail('test12@example.com'); // Replace with actual valid username
            await loginPage.enterPassword('password!'); // Replace with actual valid password
            await loginPage.clickSignInButton(); // Click the "Sign in" button

   // Wait for the error message to appear
   await driver.wait(until.elementLocated(loginPage.errorMessageLocator), 5000);

   const errorMessage = await loginPage.getErrorMessageText();
   expect(errorMessage).to.equal('Login Gagal! Akun tidak ada.');

} catch (error) {
    // Take a screenshot on failure
    await takeScreenshot(driver, 'loginRedirectFailure');
    throw error;
}
    });
});
function loginPage() {
    return './LoginPage';
}

