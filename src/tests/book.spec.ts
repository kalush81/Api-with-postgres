import { BookStore } from "../models/books";

const book = new BookStore;

describe('book model', () => {
  it('should hava an index method', () => {
    expect(book.index).toBeDefined;
  });
  it('should return list of books', async () => {
    const result = await book.index();
    expect(result).toEqual([]);
  });
});
