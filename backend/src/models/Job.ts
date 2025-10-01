import { Schema, model, models, Model } from 'mongoose';

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';

export interface JobDocument {
	_title: string;
	slug: string;
	description: string;
	requirements: string[];
	location: string;
	department: string;
	experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
	type: JobType;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const JobSchema = new Schema<JobDocument>(
	{
		_title: { type: String, required: true },
		slug: { type: String, required: true, unique: true, index: true },
		description: { type: String, required: true },
		requirements: [{ type: String, required: true }],
		location: { type: String, required: true },
		department: { type: String, required: true },
		experienceLevel: { type: String, enum: ['junior', 'mid', 'senior', 'lead'], required: true },
		type: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'], required: true },
		active: { type: Boolean, default: true }
	},
	{ timestamps: true }
);

export const Job: Model<JobDocument> =
	(models.Job as Model<JobDocument>) || model<JobDocument>('Job', JobSchema);
