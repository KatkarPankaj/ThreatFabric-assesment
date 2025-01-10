import { test, expect } from '@playwright/test';
import bookSearch from '../../data/apiTestData.json'
import logger from "../../utils/loggerutils";

test.describe('Test Filter books by author name ', () => {
 
  bookSearch.SearchBooks.forEach((bookDetail, index) => {
    const booksByAuthor = bookDetail.bookAuthor[index];
    test(`Verify book Author code for : ${bookDetail.bookAuthor} ${index + 1}`, async ({ request }, testInfo) => {
      logger.info(`Started executing test Name : ${testInfo.title}`);
      const response = await request.get('/search.json?', {
        params: {
          title: bookDetail.BookName,
          author: bookDetail.bookAuthor,
        },
      });
      await expect(response.status()).toBe(200);
      console.log("Response Status is----" + response.status())
      const authorKey = JSON.parse(await response.text());
      if (authorKey.numFound == 0) {
        throw new Error(`No Records for with combination of! BookName : ${bookDetail.BookName} and AuthorName: ${bookDetail.bookAuthor}`);

      }
      console.log(authorKey)
      const testOutput = authorKey.docs[0].author_key[0];;
      await expect(testOutput).toBe(bookDetail.ExpectedAuthorKey)


      const response1 = await request.get(`https://openlibrary.org/authors/${testOutput}.json`, {
        params: {

        }
      })
      await expect(response1.status()).toBe(200);
      const GetAuthor = JSON.parse(await response1.text());
      logger.info("This is the Author name: " + GetAuthor.personal_name);
      await expect(GetAuthor.personal_name).toBe(bookDetail.bookAuthor);
      logger.info(`Started executing test Name : ${testInfo.title}`)
    })
  });

})
