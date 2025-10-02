import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchJobs, submitApplication } from '../lib/api';
import type { Job } from '../lib/api';

const applySchema = z.object({
	jobId: z.string(),
	name: z.string().min(2),
	email: z.string().email(),
	coverLetter: z.string().max(5000).optional(),
	resume: z.any().optional(),
});

type ApplyValues = z.infer<typeof applySchema>;

function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -16 }}
			className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
		>
			<h3 className="text-xl font-semibold">{job.title}</h3>
			<p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{job.description}</p>
			<div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
				<span className="rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700">{job.type}</span>
				<span className="rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700">{job.location}</span>
				<span className="rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700">{job.experience}</span>
				<span className="rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700">{job.department}</span>
			</div>
			<div className="mt-6">
				<button onClick={() => onApply(job)} className="rounded-full bg-indigo-600 px-4 py-2 text-white">Apply Now</button>
			</div>
		</motion.div>
	);
}

function ApplyModal({ open, onClose, job }: { open: boolean; onClose: () => void; job?: Job }) {
	const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ApplyValues>({ resolver: zodResolver(applySchema), defaultValues: { jobId: job?._id || '' } });
	useEffect(() => { reset({ jobId: job?._id || '', name: '', email: '', coverLetter: '' }); }, [job, reset]);
	if (!open || !job) return null;
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
			<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
				<h3 className="text-xl font-semibold">Apply for {job.title}</h3>
				<form
					onSubmit={handleSubmit(async (values) => {
						await submitApplication({
							jobId: job._id,
							name: values.name,
							email: values.email,
							coverLetter: values.coverLetter
						});
						onClose();
					})}
					className="mt-4 space-y-4"
				>
					<div>
						<label className="block text-sm">Name</label>
						<input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('name')} />
						{errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message as string}</p>}
					</div>
					<div>
						<label className="block text-sm">Email</label>
						<input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('email')} />
						{errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message as string}</p>}
					</div>
					<div>
						<label className="block text-sm">Cover letter</label>
						<textarea className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" rows={4} {...register('coverLetter')} />
					</div>
					<div>
						<label className="block text-sm">Resume</label>
						<input id="resume" type="file" accept=".pdf,.doc,.docx" className="mt-1 w-full text-sm" />
					</div>
					<div className="flex justify-end gap-2">
						<button type="button" onClick={onClose} className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 dark:border-slate-700 dark:text-slate-200">Cancel</button>
						<button disabled={isSubmitting} className="rounded-md bg-indigo-600 px-4 py-2 text-white">Submit</button>
					</div>
				</form>
			</motion.div>
		</motion.div>
	);
}

export default function JobsPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [jobs, setJobs] = useState<Job[]>([]);
	const [, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedJob, setSelectedJob] = useState<Job | undefined>(undefined);

	const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
	useEffect(() => {
		const loadJobs = async () => {
			setLoading(true);
			try {
				const response = await fetchJobs(params);
				setJobs(response.data || []);
				setTotal(response.meta?.total || 0);
			} catch (error) {
				console.error('Error fetching jobs:', error);
				setJobs([]);
				setTotal(0);
			} finally {
				setLoading(false);
			}
		};
		
		loadJobs();
	}, [params]);

	function updateParam(key: string, value?: string) {
		const next = new URLSearchParams(searchParams);
		if (value) next.set(key, value); else next.delete(key);
		setSearchParams(next);
	}

	return (
		<div className="mx-auto max-w-7xl px-6 py-12">
			<h1 className="text-3xl font-bold tracking-tight">Open Roles</h1>
			<div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
				<input placeholder="Search jobs" className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={params.search || ''} onChange={(e) => updateParam('search', e.target.value)} />
				<select className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={params.type || ''} onChange={(e) => updateParam('type', e.target.value)}>
					<option value="">Any type</option>
					<option value="Full-time">Full-time</option>
					<option value="Part-time">Part-time</option>
					<option value="Contract">Contract</option>
					<option value="Internship">Internship</option>
				</select>
				<input placeholder="Location" className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={params.location || ''} onChange={(e) => updateParam('location', e.target.value)} />
				<select className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={params.experience || ''} onChange={(e) => updateParam('experience', e.target.value)}>
					<option value="">Any level</option>
					<option value="Junior">Junior</option>
					<option value="Mid-level">Mid-level</option>
					<option value="Senior">Senior</option>
				</select>
			</div>
			<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<AnimatePresence>
					{loading ? (
						[...Array(6)].map((_, i) => (<div key={i} className="h-44 animate-pulse rounded-xl bg-slate-200/60 dark:bg-slate-800" />))
					) : jobs.length > 0 ? (
						jobs.map((job) => (
							<JobCard key={job._id} job={job} onApply={(j) => { setSelectedJob(j); setModalOpen(true); }} />
						))
					) : (
						<div className="col-span-full text-center py-12">
							<p className="text-slate-500 dark:text-slate-400">No jobs found matching your criteria.</p>
						</div>
					)}
				</AnimatePresence>
			</div>
			<AnimatePresence>
				{modalOpen && <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)} job={selectedJob} />}
			</AnimatePresence>
		</div>
	);
}
