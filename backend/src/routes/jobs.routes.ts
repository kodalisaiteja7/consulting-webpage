import { Router } from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/asyncHandler';
import { createJob, deleteJob, getJob, listJobs, updateJob } from '../controllers/jobs.controller';

export const jobsRouter = Router();

jobsRouter.get('/', asyncHandler(listJobs));

jobsRouter.get('/:slug', asyncHandler(getJob));

const jobValidators = [
	body('_title').isString().isLength({ min: 3 }),
	body('slug').isString().isLength({ min: 3 }),
	body('description').isString().isLength({ min: 10 }),
	body('requirements').isArray({ min: 1 }),
	body('location').isString().notEmpty(),
	body('department').isString().notEmpty(),
	body('experienceLevel').isIn(['junior', 'mid', 'senior', 'lead']),
	body('type').isIn(['full-time', 'part-time', 'contract', 'internship', 'remote'])
];

jobsRouter.post('/', jobValidators, asyncHandler(createJob));

jobsRouter.put('/:slug', jobValidators, asyncHandler(updateJob));

jobsRouter.delete('/:slug', asyncHandler(deleteJob));
