import mongoose from 'mongoose';
import { env } from './env';

export let isDbReady = false;

export async function connectToDatabase(): Promise<void> {
	mongoose.set('strictQuery', true);
	try {
		await mongoose.connect(env.mongoUri);
		isDbReady = true;
		mongoose.connection.on('disconnected', () => {
			isDbReady = false;
		});
		mongoose.connection.on('reconnected', () => {
			isDbReady = true;
		});
		console.log('Connected to MongoDB');
	} catch (err) {
		isDbReady = false;
		console.error('MongoDB connection failed:', (err as Error).message);
	}
}
