import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { BookStore } from './models/books'

const bookStore = new BookStore();

const app: express.Application = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())

app.get('/', async function (req: Request, res: Response):Promise<void> {
    const books = await bookStore.index()
    res.send(books)
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
