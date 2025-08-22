import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export default function AuthMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if(!token) {
    return res.status(403).json({
      error: `Token no llego XD`
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) {
      return res.status(403).json({
        error: 'Token expirado tonoto'
      });
    }
    req.user = decoded;
    next()
  });
}