import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export type JwtPayload = { sub: string; role: 'admin' };

export function signAdminToken(adminId: string) {
	const payload: JwtPayload = { sub: adminId, role: 'admin' };
	return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn as string });
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	try {
		const auth = req.headers.authorization || '';
		const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
		if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
		const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
		if (decoded.role !== 'admin') return res.status(403).json({ success: false, message: 'Forbidden' });
		(req as any).user = decoded;
		return next();
	} catch {
		return res.status(401).json({ success: false, message: 'Unauthorized' });
	}
}
