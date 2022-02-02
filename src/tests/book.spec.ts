import { BookStore } from "../models/books";

console.log(process.env.ENV);

const book = new BookStore;

describe('drop book model', () => {
  
  it('should hava an index method', () => {
    expect(book.index).toBeDefined;
  });

  it('should return list of books', async () => {
    const result = await book.index();
    expect(result).toEqual([]);
  });

  it('create method should add a book', async () => {
    const result = await book.create({
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
      summary: ''
    });
    expect(result).toEqual({
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
      summary: ''
    });
  });

  it('get one book by id', async() => { 
    //book.show("1");
    const result = await book.show("1")

    expect(result).toEqual({
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
      summary: ''
    });
  })

  it('delete method should remove the book', async () => {
    await book.delete("1");
    const result = await book.index()

    expect(result).toEqual([]);
  });

});
