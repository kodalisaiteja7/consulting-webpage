import { motion } from 'framer-motion';

export default function AboutPage() {
	const events = [
		{ 
			year: '2019', 
			text: 'Founded with a mission to unlock growth.',
			description: 'Started as a small team of passionate consultants focused on helping startups scale their operations and reach new markets.'
		},
		{ 
			year: '2021', 
			text: 'Expanded into design and product strategy.',
			description: 'Added world-class design and product strategy capabilities to help companies create exceptional user experiences.'
		},
		{ 
			year: '2024', 
			text: 'Launched AI consulting practice.',
			description: 'Pioneered AI integration services, helping businesses leverage machine learning and automation for competitive advantage.'
		},
	];
	
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
							About Teja Consulting
						</span>
					</h1>
					<p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
						We're a team of passionate strategists, designers, and engineers who believe in the power of great products to transform businesses.
					</p>
				</motion.div>

				<div className="space-y-12">
					{events.map((event, i) => (
						<motion.div 
							key={i} 
							initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} 
							whileInView={{ opacity: 1, x: 0 }} 
							viewport={{ once: true }} 
							transition={{ duration: 0.8, delay: i * 0.2 }}
							className={`flex items-center gap-12 ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}
						>
							<div className="flex-1">
								<div className="rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-200 dark:border-slate-700">
									<div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{event.year}</div>
									<h3 className="text-2xl font-semibold mb-4">{event.text}</h3>
									<p className="text-slate-600 dark:text-slate-300">{event.description}</p>
								</div>
							</div>
							<div className="flex-1">
								<div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl flex items-center justify-center">
									<div className="text-6xl">
										{i === 0 && '🚀'}
										{i === 1 && '🎨'}
										{i === 2 && '🤖'}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					viewport={{ once: true }}
					className="mt-20 text-center"
				>
					<h2 className="text-3xl font-bold mb-8">
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Our Values
						</span>
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{[
							{ title: "Innovation", desc: "We embrace cutting-edge technologies and creative solutions.", icon: "💡" },
							{ title: "Excellence", desc: "We deliver exceptional quality in everything we do.", icon: "⭐" },
							{ title: "Partnership", desc: "We work closely with our clients as trusted partners.", icon: "🤝" }
						].map((value, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
								viewport={{ once: true }}
								className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
							>
								<div className="text-4xl mb-4">{value.icon}</div>
								<h3 className="text-xl font-semibold mb-2">{value.title}</h3>
								<p className="text-slate-600 dark:text-slate-300">{value.desc}</p>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
