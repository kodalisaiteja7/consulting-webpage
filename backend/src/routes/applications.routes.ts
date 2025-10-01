import { Router } from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/asyncHandler';
import { createApplication, listApplications } from '../controllers/applications.controller';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

export const applicationsRouter = Router();

applicationsRouter.get('/', asyncHandler(listApplications));

applicationsRouter.post(
	'/',
	upload.single('resume'),
	[
		body('job').isString().notEmpty(),
		body('name').isString().isLength({ min: 2 }),
		body('email').isEmail(),
		body('coverLetter').optional().isString().isLength({ max: 5000 })
	],
	asyncHandler(async (req, res, next) => {
		if (req.file) {
			(req as any).fileUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
		}
		return createApplication(req, res);
	})
);
