import { Page, expect } from "@playwright/test";
import test from "@playwright/test";
import bookSearch from '../../data/filterByAuthor.json'
import advanceSearch from "../../pages/advanceSearch";
import logger from "../../utils/loggerutils";


test.describe('Test Filter books by author name ', () => {
  bookSearch.BookDetails.forEach((bookDetail, index) => {
    const booksByAuthor = bookSearch.BookByAuthor[index];
    test(`Verify top books by:  ${bookDetail.AuthorName} Test ${index + 1}`, async ({ page },testInfo) => {
      logger.info(`Started executing test Name : ${testInfo.title}`)
      const searchBooks = new advanceSearch(page);
      await searchBooks.navigateTohomePage(process.env.applicationURL!);
      await searchBooks.clicOnBrowseMenu();
      await searchBooks.selectAdvanceSearch();
      await searchBooks.enterBookTitle(bookDetail.BookName);
      await searchBooks.enterBookAuthor(bookDetail.AuthorName);
      await searchBooks.clickOnSearchButton();
      await searchBooks.clickonAuthor(bookDetail.AuthorName);
      await searchBooks.filterByToRated();
      await searchBooks.selecttoptwobooks(booksByAuthor.BookName1, booksByAuthor.BookName2);
      logger.info(`Finished executing test Name : ${testInfo.title}`)
    })
  })
})