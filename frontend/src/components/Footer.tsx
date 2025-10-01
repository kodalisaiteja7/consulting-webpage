import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const footerSections = [
		{
			title: 'Services',
			links: [
				{ name: 'Strategy', href: '/services' },
				{ name: 'Design', href: '/services' },
				{ name: 'Engineering', href: '/services' },
				{ name: 'AI & Data', href: '/services' }
			]
		},
		{
			title: 'Company',
			links: [
				{ name: 'About Us', href: '/about' },
				{ name: 'Careers', href: '/jobs' },
				{ name: 'Contact', href: '/contact' },
				{ name: 'Privacy Policy', href: '/privacy' }
			]
		}
	];

	return (
		<footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
			<div className="mx-auto max-w-7xl px-6 py-16">
				{/* Main Footer Content */}
				<div className="grid lg:grid-cols-3 gap-8 mb-12">
					{/* Company Info */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="lg:col-span-1"
					>
						<Link to="/" className="inline-block mb-4">
							<span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
								Teja Consulting
							</span>
						</Link>
						<p className="text-slate-300 mb-6 max-w-sm">
							We help ambitious teams build exceptional products through strategy, design, and engineering.
						</p>
						<div className="space-y-3">
							<div className="flex items-center space-x-3">
								<span className="text-blue-400">📧</span>
								<a href="mailto:hello@tejaconsulting.com" className="text-slate-300 hover:text-white transition-colors">
									hello@tejaconsulting.com
								</a>
							</div>
							<div className="flex items-center space-x-3">
								<span className="text-blue-400">📱</span>
								<a href="tel:+15551234567" className="text-slate-300 hover:text-white transition-colors">
									+1 (555) 123-4567
								</a>
							</div>
							<div className="flex items-center space-x-3">
								<span className="text-blue-400">📍</span>
								<span className="text-slate-300">San Francisco, CA</span>
							</div>
						</div>
					</motion.div>

					{/* Footer Links */}
					{footerSections.map((section, index) => (
						<motion.div
							key={section.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<h3 className="text-lg font-semibold mb-4">{section.title}</h3>
							<ul className="space-y-3">
								{section.links.map((link, linkIndex) => (
									<li key={linkIndex}>
										<Link 
											to={link.href}
											className="text-slate-300 hover:text-white transition-colors duration-200"
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>

				{/* Copyright */}
				<div className="border-t border-slate-700 pt-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						viewport={{ once: true }}
						className="text-center"
					>
						<p className="text-slate-400 text-sm">
							© {currentYear} Teja Consulting. All rights reserved.
						</p>
					</motion.div>
				</div>
			</div>
		</footer>
	);
}
