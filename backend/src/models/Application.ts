import { Schema, model, models, Types } from 'mongoose';

export interface ApplicationDocument {
	job: Types.ObjectId;
	name: string;
	email: string;
	coverLetter?: string;
	resumeUrl?: string;
	createdAt: Date;
	updatedAt: Date;
}

const ApplicationSchema = new Schema<ApplicationDocument>(
	{
		job: { type: Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		coverLetter: { type: String },
		resumeUrl: { type: String }
	},
	{ timestamps: true }
);

export const Application = models.Application || model<ApplicationDocument>('Application', ApplicationSchema);
