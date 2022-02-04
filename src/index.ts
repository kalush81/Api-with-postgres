import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { BookStore } from './models/book/book-model';
import { bookRoutes } from './models/book/book-handler';
import cors from 'cors';

const bookStore = new BookStore();

const app: express.Application = express();
const address: string = 'localhost:3000';

app.use(bodyParser.json());
app.use(cors())

bookRoutes(app);

app.get('/', async function (req: Request, res: Response): Promise<void> {
  res.send('main route');
});

console.log('env', process.env.ENV);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
