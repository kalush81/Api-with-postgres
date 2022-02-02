import express, { Response, Request } from 'express';

const showAll = async (_req: Request, res: Response) => {
  try {
    res.send('this is the INDEX route');
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

export const bookRoutes = (app: express.Application) => {
  app.get('/books', showAll);
  app.get('/books/:id', showOne);
  app.post('/books', create);
  app.put('/books/:id', edit);
  app.delete('/books/:id', destroy);
};
