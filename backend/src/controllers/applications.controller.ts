import { Request, Response } from 'express';
import { Application } from '../models/Application';
import { Job } from '../models/Job';
import { validationResult } from 'express-validator';

export async function createApplication(req: Request, res: Response) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

	const job = await Job.findById(req.body.job);
	if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

	const resumeUrl = (req as any).fileUrl as string | undefined;
	const appDoc = await (Application as any).create({
		job: job._id,
		name: req.body.name,
		email: req.body.email,
		coverLetter: req.body.coverLetter,
		resumeUrl
	});

	res.status(201).json({ success: true, data: appDoc });
}

export async function listApplications(req: Request, res: Response) {
	const apps = await (Application as any).find({}).sort({ createdAt: -1 }).limit(200);
	res.json({ success: true, data: apps });
}
