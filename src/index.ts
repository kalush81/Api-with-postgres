import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { BookStore } from './models/books'
import { routes } from './routes/appRoutes';

const bookStore = new BookStore();

const app: express.Application = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())

routes(app);

app.get('/', async function (req: Request, res: Response):Promise<void> {
  
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
