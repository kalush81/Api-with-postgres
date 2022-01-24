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

}