import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { BookStore } from './models/books'
//import client from './database';

const bookStore = new BookStore();

const app: express.Application = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())

app.get('/', async function (req: Request, res: Response):Promise<void> {
    
  //const conn = await client.connect()
  //const result = await conn.query('SELECT * FROM jackets');
  
  try {
    const books = await bookStore.index()
    res.send(books)
  } catch (error) {
    res.status(500).send('ups')
  }
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
