import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '~/env';


declare module 'express-serve-static-core' {
  interface Request {
    userId?: number;
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('Auth middleware called');
  console.log('Request URL:', req.url);
  console.log('Request method:', req.method);
  console.log('Cookies:', req.cookies);
  console.log('Authorization header:', req.headers.authorization);
  
  // Try to get token from cookies first, then from Authorization header
  let token = req.cookies.token;
  
  if (!token) {
    const authHeader = req.headers.authorization;
    console.log('No cookie token, checking authorization header:', authHeader);
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('Extracted token from header:', token.substring(0, 20) + '...');
    }
  } else {
    console.log('Found token in cookies:', token.substring(0, 20) + '...');
  }
  
  if (!token) {
    console.log('No token found, returning 401');
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: number };
    console.log('Token decoded successfully, userId:', decoded.userId);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
};