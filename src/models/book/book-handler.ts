import express, { Response, Request } from 'express';
import { Book, BookStore } from './book-model';
import { verifyAuthToken } from '../../middlewares/verifyAuthTokenMIddleware';

const book = new BookStore()

const showAll = async (_req: Request, res: Response) => {
  try {
    const result = await book.index()
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showOne = async (_req: Request, res: Response) => {
  try {
    res.send('this is the SHOW route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    res.send('this is the CREATE route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    res.send('this is the EDIT route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (_req: Request, res: Response) => {
  try {
    res.send('this is the DELETE route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};


//todo test all controllers

export const bookRoutes = (app: express.Application) => {
  app.get('/books', showAll);
  app.get('/books/:id', showOne);
  app.post('/books', verifyAuthToken, create);
  app.put('/books/:id',verifyAuthToken,  edit);
  app.delete('/books/:id', verifyAuthToken, destroy);
};
