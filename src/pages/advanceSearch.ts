import { Page, expect } from "@playwright/test";
import logger from "../utils/loggerutils";
import findValidElement from "../utils/SelfHealingutils"

export default class advanceSearch {
    //Define web elements here..
    private readonly browseMenu = 'Browse Menu'
    private readonly advaceSearchLin = 'Advanced Search'
    private readonly filterByTitle = 'Title'
    private readonly filterByAuthor = 'Author'
    private readonly filterByISBN = 'ISBN '
    private readonly filterBySubject = 'Subject'
    private readonly filterbyPlace = 'Place'
    private readonly verifySearchResultelement = ['#searchResults', 'xpath=//*[@id="contentBody"]/center/div']
    private readonly searchButton = 'Search'
    private readonly clickOnDropDown = 'Most Editions'
    private readonly selectTopRated = '✓ Top Rated'
    constructor(private page: Page) {

    }
    // Navigate to the application home page

    async navigateTohomePage(applicationURL: string) {
        logger.info("navigating to the application URL  :" + applicationURL)
        await this.page.goto(applicationURL);
    }
    // Click on the 'Browse' menu

    async clicOnBrowseMenu() {
        logger.info("clicking on a browse Manu  :")
        await this.page.locator('#header-bar').getByText(this.browseMenu).click();
    }
    // Select the 'Advanced Search' option from a dropdown menu

    async selectAdvanceSearch() {
        logger.info("Selecting advance search from a dropdown  :")
        await this.page.locator('#header-bar').getByRole('link', { name: this.advaceSearchLin }).click();
    }
    // Enter the book title in the filter input

    async enterBookTitle(bookTitle: string) {
        logger.info(`Entering a book title  : ${bookTitle}`)
        await this.page.getByLabel(this.filterByTitle).fill(bookTitle);
    }
    // Enter the author's name in the filter input

    async enterBookAuthor(bookAuthor: string) {
        logger.info("Entering a book Author  : " + bookAuthor)
        await this.page.getByLabel(this.filterByAuthor).fill(bookAuthor);
    }
    // Verify error message for invalid search results

    async verifyInvalidSearch(searchError: string) {
        logger.info("Verifying search result for :" + searchError)
        await expect(await this.page.getByText(searchError)).toBeVisible();
    }
    // Verify search results contain the expected text

    async verifySearchresult(expected: string) {
        logger.info("Verifying search result for : " + expected)
        let findresultlist = await findValidElement(this.page, this.verifySearchResultelement);
        await expect(await findresultlist?.innerText()).toContain(expected);

    }
    // Click the search button

    async clickOnSearchButton() {
        logger.info("Clicking on search button")
        await this.page.getByRole('button', { name: this.searchButton, exact: true }).click();
    }
    // Filter search results by 'Top Rated' option

    async filterByToRated() {
        logger.info("Clicking on top rated")
        await this.page.locator('summary').filter({ hasText: this.clickOnDropDown }).click();
        await this.page.getByRole('link', { name: this.selectTopRated }).click();
    }
    // Click on an author's name in the results

    async clickonAuthor(bookAuthor: string) {
        logger.info("Clicking on author name")
        await this.page.click(`text="${bookAuthor}"`);
    }
    // Verify the top two books in the search results

    async selecttoptwobooks(top1: string, top2: string) {
        logger.info("Started verifying the top rated books by Author")
        const bookTitlesSelector = '.list-books .searchResultItem .details .resultTitle .booktitle';;
        // Wait for the book list to load
        await this.page.waitForSelector(bookTitlesSelector);

        // Get the top 2 book titles

        const topTwoBookTitles = await this.page.locator(bookTitlesSelector).nth(0).textContent();
        const secondBookTitle = await this.page.locator(bookTitlesSelector).nth(1).textContent();
        const book1 = topTwoBookTitles?.toString().trim();
        const book2 = secondBookTitle?.toString().trim();
        // Log the top two book titles
        logger.info('Top book title:', book1);
        logger.info('Second book title:', book2);
        await expect(book1).toBe(top1);
        await expect(book2).toBe(top2);
    }

}
