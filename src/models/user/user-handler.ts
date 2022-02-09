import express, { NextFunction, Request, Response } from 'express';
import { User, UserStore } from '../user/user.model';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../../middlewares/verifyAuthTokenMIddleware';

const store = new UserStore()

const create = async (req: Request, res: Response, next: NextFunction) => { 
  const user: User = {
    username: req.body.username,
    password: req.body.password
  }
  try {
    console.log('sign up')
    const newUser = await store.create(user)
    const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET as string)
    res.json(token);
  } catch (error) {
    res.status(400)
    res.json(error + ' ' + user)
  }
}

const authenticate = async (req: Request, res: Response) => { 
  const user: User = {
    username: req.body.username,
    password: req.body.password
  }
  try {
    const user = await store.authenticate(req.body.username, req.body.password)
    res.json(user);
    
  } catch (error) {
    res.status(400)
    res.json(error + ' ' + user)
  }

}

const getUserData = (req: Request, res: Response) => { 
  res.json('user data')
}


export const userRoutes = (app: express.Application) => { 
  app.post('/user', create);
  app.post('/user/login', authenticate);
  app.get('/user/dashboard', verifyAuthToken, getUserData)
}