import { query } from "express";
import client from "../database";

export type Book = {
  id: Number, 
  title: string, 
  author: string, 
  total_pages: number, 
  type: string,
  summary: string
}

export class BookStore { 
  //get all books 
  async index(): Promise<Book[]> { 
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM books'
      const result = await conn.query(sql)
      conn.release();
      return result.rows
      
    } catch (error) {
      throw new Error(`Could not get books: ${error}`)
    }
  }
  async create(b: Book): Promise<Book> { 
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO books (title, author, total_pages, type, summary) VALUES($1, $2, $3, $4, $5) RETURNING*'
      const props = [b.title, b.author, b.total_pages, b.type, b.summary]
      const result = await conn.query(sql, props)
      conn.release();
      return result.rows[0]
      
    } catch (error) {
      throw new Error(`couldn't create book, ${b.title}, ${error}`)
    }
  }

}