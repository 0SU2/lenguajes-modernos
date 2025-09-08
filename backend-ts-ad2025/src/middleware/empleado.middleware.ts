import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const EmpleadoMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(400).json({
      error: 'Token Invalido'
    });
  }
  try {
    console.log(token)
   const decoded = jwt.verify(token, process.env.JWT_SECRET!);
   (req as any).user = decoded
   console.log(`middleware => ${decoded}`);
   console.log("arreglar el middleware")
  //  next()
  } catch (error) {
    return res.status(401).json({
      error: 'Token Invalido'
    });
  }

}