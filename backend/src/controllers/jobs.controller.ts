import { Request, Response } from 'express';
import { Job } from '../models/Job';
import { validationResult } from 'express-validator';

export async function listJobs(req: Request, res: Response) {
	const { q, type, location, department, experienceLevel, page = '1', limit = '12' } = req.query as any;
	const filter: any = { active: true };
	if (q) filter.$text = { $search: q };
	if (type) filter.type = type;
	if (location) filter.location = { $regex: location, $options: 'i' }; // Case-insensitive partial match
	if (department) filter.department = department;
	if (experienceLevel) filter.experienceLevel = experienceLevel;

	const pageNum = Math.max(parseInt(String(page), 10) || 1, 1);
	const limitNum = Math.min(Math.max(parseInt(String(limit), 10) || 12, 1), 100);

	const [items, total] = await Promise.all([
		Job.find(filter).sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(limitNum),
		Job.countDocuments(filter)
	]);
	res.json({ success: true, data: items, meta: { total, page: pageNum, limit: limitNum } });
}

export async function getJob(req: Request, res: Response) {
	const job = await Job.findOne({ slug: req.params.slug, active: true });
	if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
	res.json({ success: true, data: job });
}

export async function createJob(req: Request, res: Response) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
	const job = await Job.create(req.body);
	res.status(201).json({ success: true, data: job });
}

export async function updateJob(req: Request, res: Response) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
	const job = await Job.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
	if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
	res.json({ success: true, data: job });
}

export async function deleteJob(req: Request, res: Response) {
	const deleted = await Job.findOneAndDelete({ slug: req.params.slug });
	if (!deleted) return res.status(404).json({ success: false, message: 'Job not found' });
	res.json({ success: true, message: 'Job deleted' });
}
