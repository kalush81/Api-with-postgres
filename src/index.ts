import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { bookRoutes } from './models/book/book-handler';
import { userRoutes } from './models/user/user-handler'
import cors from 'cors';

const app: express.Application = express();
const address: string = 'localhost:3000';

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//app.use(cors())

app.use((req, res, next) => {
  console.log(req.headers)
  next()
 })

bookRoutes(app);
userRoutes(app);

app.get('/', async function (req: Request, res: Response): Promise<void> {
  res.send('main route');
});

console.log('env', process.env.ENV);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
