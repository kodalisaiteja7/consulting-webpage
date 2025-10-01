import { Router } from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/asyncHandler';
import { signAdminToken, requireAuth } from '../middleware/auth';
import { createJob, deleteJob, updateJob } from '../controllers/jobs.controller';

export const adminRouter = Router();

adminRouter.post(
	'/login',
	[body('email').isEmail(), body('password').isString().isLength({ min: 6 })],
	asyncHandler(async (req, res) => {
		// In production, verify from DB. For demo, accept from env or fixed creds.
		const ok = req.body.email && req.body.password; // replace with real check
		if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });
		const token = signAdminToken('admin');
		res.json({ success: true, token });
	})
);

adminRouter.use(requireAuth);

adminRouter.post('/jobs', createJob as any);
adminRouter.put('/jobs/:slug', updateJob as any);
adminRouter.delete('/jobs/:slug', deleteJob as any);
