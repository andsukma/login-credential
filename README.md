Selenium WebDriver Test Framework

This project contains an automated test suite using Selenium WebDriver to test the login functionality of the (https://lapor.folkatech.com/) web application. The test framework is implemented using JavaScript and follows the Page Object Model (POM) design pattern for better maintainability and organization.

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [ChromeDriver](https://sites.google.com/chromium.org/driver/) (for running tests in Chrome browser)
- [Chrome Browser](https://www.google.com/chrome/) (latest version)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repository/login-credential.git
   cd login-credential

2.```bash
npm install 
(This will install all necessary dependencies, including selenium-webdriver, mocha, chai, and other testing utilities)

3. Running Test
   ```bash
 npx mocha tests/loginTest.js
