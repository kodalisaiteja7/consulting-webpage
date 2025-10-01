import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
	const [, setActiveSection] = useState('hero');
	const heroRef = useRef<HTMLElement>(null);
	const aboutRef = useRef<HTMLElement>(null);
	const servicesRef = useRef<HTMLElement>(null);
	const jobsRef = useRef<HTMLElement>(null);
	const contactRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			const sections = [
				{ id: 'hero', ref: heroRef },
				{ id: 'about', ref: aboutRef },
				{ id: 'services', ref: servicesRef },
				{ id: 'jobs', ref: jobsRef },
				{ id: 'contact', ref: contactRef },
			];

			const scrollPosition = window.scrollY + 100;

			for (const section of sections) {
				if (section.ref.current) {
					const { offsetTop, offsetHeight } = section.ref.current;
					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
						setActiveSection(section.id);
						break;
					}
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToSection = (sectionId: string) => {
		const sectionMap = {
			hero: heroRef,
			about: aboutRef,
			services: servicesRef,
			jobs: jobsRef,
			contact: contactRef,
		};
		
		sectionMap[sectionId as keyof typeof sectionMap]?.current?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	return (
		<div className="relative">
			{/* Hero Section */}
			<section ref={heroRef} id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
				{/* Animated Background Elements */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-3xl animate-pulse-slow"></div>
					<div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
				</div>
				
				<div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1 className="text-6xl md:text-8xl font-extrabold tracking-tight">
							<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
								Consulting that moves you forward
							</span>
						</h1>
						<p className="mt-8 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
							We help ambitious teams build exceptional products through strategy, design, and engineering. 
							From startups to enterprises, we deliver results that matter.
						</p>
						<div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<button 
									onClick={() => scrollToSection('contact')}
									className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-white shadow-xl transition-all hover:shadow-2xl hover:shadow-blue-500/25"
								>
									Get Started Today
								</button>
							</motion.div>
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<button 
									onClick={() => scrollToSection('services')}
									className="rounded-full border-2 border-slate-300 px-8 py-4 dark:border-slate-600 hover:border-blue-500 transition-colors"
								>
									Explore Services
								</button>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* About Section */}
			<section ref={aboutRef} id="about" className="py-24 bg-white dark:bg-slate-800">
				<div className="mx-auto max-w-7xl px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								About Teja Consulting
							</span>
						</h2>
						<p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
							We're a team of passionate strategists, designers, and engineers who believe in the power of great products to transform businesses.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								title: "Strategic Thinking",
								description: "We help you define clear product vision, market positioning, and growth strategies that drive real results.",
								icon: "🎯"
							},
							{
								title: "Beautiful Design",
								description: "Our design team creates intuitive, accessible, and delightful user experiences that your customers will love.",
								icon: "🎨"
							},
							{
								title: "Robust Engineering",
								description: "We build scalable, secure, and performant applications using modern technologies and best practices.",
								icon: "⚡"
							}
						].map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								viewport={{ once: true }}
								className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 hover:shadow-xl transition-shadow"
							>
								<div className="text-4xl mb-4">{item.icon}</div>
								<h3 className="text-xl font-semibold mb-4">{item.title}</h3>
								<p className="text-slate-600 dark:text-slate-300">{item.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section ref={servicesRef} id="services" className="py-24 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-slate-900 dark:to-slate-800">
				<div className="mx-auto max-w-7xl px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Our Services
							</span>
						</h2>
						<p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
							Comprehensive solutions to help you build, launch, and scale exceptional products.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{
								title: "Strategy",
								description: "Roadmaps, market fit, and product vision",
								color: "from-blue-500 to-cyan-500"
							},
							{
								title: "Design",
								description: "Brand, UX, and UI with accessibility in mind",
								color: "from-purple-500 to-pink-500"
							},
							{
								title: "Engineering",
								description: "Modern web apps, APIs, and cloud infrastructure",
								color: "from-green-500 to-emerald-500"
							},
							{
								title: "AI & Data",
								description: "LLMs, analytics, and automation",
								color: "from-orange-500 to-red-500"
							}
						].map((service, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ scale: 1.05, rotateY: 5 }}
								className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
							>
								<div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
								<div className="relative">
									<h3 className="text-xl font-semibold mb-4">{service.title}</h3>
									<p className="text-slate-600 dark:text-slate-300">{service.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Jobs Section */}
			<section ref={jobsRef} id="jobs" className="py-24 bg-white dark:bg-slate-800">
				<div className="mx-auto max-w-7xl px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Join Our Team
							</span>
						</h2>
						<p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
							We're always looking for talented individuals who share our passion for building great products.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								title: "Senior Frontend Developer",
								location: "San Francisco, CA",
								type: "Full-time",
								experience: "Senior"
							},
							{
								title: "UX/UI Designer",
								location: "New York, NY",
								type: "Full-time",
								experience: "Mid-level"
							},
							{
								title: "Backend Developer",
								location: "Remote",
								type: "Full-time",
								experience: "Mid-level"
							}
						].map((job, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 p-6 shadow-sm hover:shadow-lg transition-all"
							>
								<h3 className="text-lg font-semibold mb-2">{job.title}</h3>
								<div className="flex flex-wrap gap-2 mb-4">
									<span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
										{job.type}
									</span>
									<span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs">
										{job.experience}
									</span>
								</div>
								<p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{job.location}</p>
								<Link 
									to="/jobs" 
									className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
								>
									View Details →
								</Link>
							</motion.div>
						))}
					</div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						viewport={{ once: true }}
						className="text-center mt-12"
					>
						<Link 
							to="/jobs"
							className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-white shadow-lg hover:shadow-xl transition-all"
						>
							View All Open Positions
						</Link>
					</motion.div>
				</div>
			</section>

			{/* Contact Section */}
			<section ref={contactRef} id="contact" className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
				<div className="mx-auto max-w-7xl px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
								Let's Work Together
							</span>
						</h2>
						<p className="text-xl text-slate-300 max-w-3xl mx-auto">
							Ready to transform your ideas into exceptional products? Get in touch and let's discuss your project.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-12">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
							<div className="space-y-4">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
										📧
									</div>
									<div>
										<p className="font-medium">Email</p>
										<p className="text-slate-300">hello@tejaconsulting.com</p>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
										📱
									</div>
									<div>
										<p className="font-medium">Phone</p>
										<p className="text-slate-300">+1 (555) 123-4567</p>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
										📍
									</div>
									<div>
										<p className="font-medium">Office</p>
										<p className="text-slate-300">San Francisco, CA</p>
									</div>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
						>
							<form className="space-y-6">
								<div>
									<label className="block text-sm font-medium mb-2">Name</label>
									<input 
										type="text" 
										className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
										placeholder="Your name"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Email</label>
									<input 
										type="email" 
										className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
										placeholder="your@email.com"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Message</label>
									<textarea 
										rows={4}
										className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
										placeholder="Tell us about your project..."
									></textarea>
								</div>
								<button 
									type="submit"
									className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-medium hover:shadow-lg transition-all"
								>
									Send Message
								</button>
							</form>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	);
}
