import { Request, Response, NextFunction } from 'express';
import { isDbReady } from '../config/db';

export function requireDbReady(req: Request, res: Response, next: NextFunction) {
	if (!isDbReady) {
		return res.status(503).json({ success: false, message: 'Service unavailable. Database not connected.' });
	}
	next();
}
