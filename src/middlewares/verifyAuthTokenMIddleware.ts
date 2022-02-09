import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
      const authorizationHeader = req.headers.authorization as string
      const token = authorizationHeader.split(' ')[1] 
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
      res.user = decoded

      next()
  } catch (error) {
      res.status(401)
  }
}