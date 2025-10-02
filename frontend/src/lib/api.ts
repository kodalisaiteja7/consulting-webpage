import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
	withCredentials: true,
});

export default api;

export type Job = {
	_id: string;
	title: string;
	description: string;
	requirements: string[];
	responsibilities: string[];
	location: string;
	department: string;
	experience: 'Junior' | 'Mid-level' | 'Senior';
	type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
	salary: string;
	benefits: string[];
	applicationDeadline: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

export type Paginated<T> = { success: boolean; data: T[]; meta: { total: number; page: number; limit: number } };

export async function fetchJobs(params: Record<string, string | number | undefined>) {
	const res = await api.get<{ success: boolean; data: Job[]; meta: { total: number; page: number; limit: number } }>('/jobs', { params });
	return res.data;
}

export async function fetchJobById(id: string) {
	const res = await api.get<{ success: boolean; data: Job }>(`/jobs/${id}`);
	return res.data;
}

export type ApplicationData = {
	jobId: string;
	name: string;
	email: string;
	phone?: string;
	coverLetter?: string;
};

export async function submitApplication(data: ApplicationData) {
	const res = await api.post<{ success: boolean; message: string; data: any }>('/mock/applications', data);
	return res.data;
}
