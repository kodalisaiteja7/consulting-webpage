import { motion } from 'framer-motion';

const services = [
	{ 
		title: 'Strategy', 
		desc: 'Roadmaps, market fit, and product vision.',
		details: 'We help you define clear product strategy, identify market opportunities, and create actionable roadmaps that drive growth.',
		color: 'from-blue-500 to-cyan-500',
		icon: '🎯'
	},
	{ 
		title: 'Design', 
		desc: 'Brand, UX, and UI with accessibility in mind.',
		details: 'Our design team creates beautiful, intuitive interfaces that your users will love, with a focus on accessibility and usability.',
		color: 'from-purple-500 to-pink-500',
		icon: '🎨'
	},
	{ 
		title: 'Engineering', 
		desc: 'Modern web apps, APIs, and cloud infrastructure.',
		details: 'We build scalable, secure applications using the latest technologies and best practices for performance and reliability.',
		color: 'from-green-500 to-emerald-500',
		icon: '⚡'
	},
	{ 
		title: 'AI & Data', 
		desc: 'LLMs, analytics, and automation.',
		details: 'Leverage the power of AI and data analytics to automate processes, gain insights, and create intelligent solutions.',
		color: 'from-orange-500 to-red-500',
		icon: '🤖'
	},
];

export default function ServicesPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
			<div className="mx-auto max-w-7xl px-6 py-24">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h1 className="text-5xl md:text-6xl font-bold mb-6">
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Our Services
						</span>
					</h1>
					<p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
						Comprehensive solutions to help you build, launch, and scale exceptional products.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 gap-8">
					{services.map((service, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							whileHover={{ scale: 1.02, rotateY: 2 }}
							className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
						>
							<div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
							<div className="relative">
								<div className="flex items-center gap-4 mb-4">
									<div className="text-4xl">{service.icon}</div>
									<h3 className="text-2xl font-bold">{service.title}</h3>
								</div>
								<p className="text-lg text-slate-600 dark:text-slate-300 mb-4">{service.desc}</p>
								<p className="text-slate-500 dark:text-slate-400">{service.details}</p>
								<div className="mt-6">
									<button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
										Learn More →
									</button>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					viewport={{ once: true }}
					className="mt-20 text-center"
				>
					<h2 className="text-3xl font-bold mb-8">
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Why Choose Us?
						</span>
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{[
							{ title: "Expert Team", desc: "Industry veterans with proven track records", icon: "👥" },
							{ title: "Fast Delivery", desc: "Agile development with rapid iteration cycles", icon: "⚡" },
							{ title: "Ongoing Support", desc: "Long-term partnership and maintenance", icon: "🛠️" }
						].map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
								viewport={{ once: true }}
								className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
							>
								<div className="text-4xl mb-4">{item.icon}</div>
								<h3 className="text-xl font-semibold mb-2">{item.title}</h3>
								<p className="text-slate-600 dark:text-slate-300">{item.desc}</p>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
