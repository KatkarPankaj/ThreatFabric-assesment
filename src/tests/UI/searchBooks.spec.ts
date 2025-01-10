import { Page, expect } from "@playwright/test";
import test from "@playwright/test";
import bookSearch from '../../data/bookSearch.json';
import advanceSearch from "../../pages/advanceSearch";
import logger from "../../utils/loggerutils";
const testData = bookSearch.SearchBooks;

test.describe('Verify book search and results', () => {
  for (const { BookName, bookAuthor, ExpectedAuthor } of testData) {
    test(`Testing book: ${BookName}`, async ({ page }, testInfo) => {
      logger.info(`Started executing test Name : ${testInfo.title}`)
      const searchBooks = new advanceSearch(page);
      await searchBooks.navigateTohomePage(process.env.applicationURL!);
      await searchBooks.clicOnBrowseMenu();
      await searchBooks.selectAdvanceSearch();
      await searchBooks.enterBookTitle(BookName);
      await searchBooks.enterBookAuthor(bookAuthor);
      await searchBooks.clickOnSearchButton();
      await searchBooks.verifySearchresult(BookName)
      logger.info(`Finished executing test Name: ${testInfo.title}`)
    })
  }
})