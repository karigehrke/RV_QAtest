// Dependencies
require('chromedriver');
var {
    Builder,
    By
} = require('selenium-webdriver')
var chai = require('chai');
var expect = chai.expect;

// Variable to call our browser during our tests
var driver

// Before each async function, driver calls the web browser we will be using to run our tests
beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
});

// After each async function is run, the web broswer will be closed signaling the end of that specific test
afterEach(async function () {
    await driver.quit();
});

// Test 1: Test 'Contact Us' footer link 
describe('Test 1: Contact Us Footer', function () {

    it('Should reroute from home page to "Contact Us" page on click', async function () {
        await driver.get('https://www.creditcards.com');

        // Finds the "Contact Us" link element by xpath and clicks
        var contactUs = await driver.findElement(By.xpath('//body//footer/div[2]/div[2]/div[2]/div[3]/ul/li[5]/a'));
        await contactUs.click();

        // We ask the browser to retrieve the title on the "Contact Us" page and we expect it to match the title we specified 
        var contactTitle = await driver.getTitle();
        await expect(contactTitle).to.equal('CreditCards.com - Contact Us');
    });
});

// Test 2: Test navbar "Card Category" dropdown menu "Rewards" link
describe('Test 2: Card Category', function () {

    it('Should show dropdown menu and have a working "Rewards" link under Card Category that reroutes to the Rewards page', async function () {
        await driver.get('https://www.creditcards.com');

        // Finds "Card Category" in the navbar, clicks, then finds the link labeled "Rewards" and clicks
        var navLink1 = await driver.findElement(By.linkText('Card Category'));
        await navLink1.click();
        await driver.findElement(By.linkText('Rewards')).click();

        // Browser retrieves the title on the "Rewards" page and matches it to what we expect the title to be
        var headerTitle = await driver.getTitle();
        await expect(headerTitle).to.equal('Best Rewards Credit Cards of 2019: Top 10 Offers - CreditCards.com');
    });
});

// Test 3: Show that the red Bank of America credit card image is present upon page load
describe('Test 3: Credit Card Image Present', function () {

    it('Should display that the red Bank of America credit card image is present upon page load', async function () {
        await driver.get('https://www.creditcards.com');

        // Finds the red credit card image element by its class name then looks at that classe's tag name
        await driver.findElement(By.className('home-page-issuer__image-wrapper'));
        var creditCardImg = await driver.findElement(By.tagName('img'));

        // isDisplayed() is a boolean method which will tell us if the image is displayed or not
        creditCardImg.isDisplayed();
    });
});

// Test 4: Make sure that the headline text is using the correct font
describe('Test 4: Headline Text', function () {

    it('Should have the "Find the Perfect Credit Card for You" headline font family as "sofiaproBold, arial, sans-serif"', async function () {
        await driver.get('https://www.creditcards.com');

        // Finds the headline by its class name then retrieves the CSS value for its font-family
        // We expect the font family found to match what we have specified
        var headerFont = await driver.findElement(By.className('homePage-hero__headline')).getCssValue("font-family");
        await expect(headerFont).to.equal('sofiaproBold, arial, sans-serif');
    });
});