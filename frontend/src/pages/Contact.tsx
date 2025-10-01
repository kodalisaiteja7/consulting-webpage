import { motion } from 'framer-motion';
import GoogleMap from '../components/GoogleMap';

export default function ContactPage() {
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
							Get In Touch
						</span>
					</h1>
					<p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
						Ready to transform your ideas into exceptional products? Let's discuss your project.
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-12">
					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
					>
						<h2 className="text-2xl font-bold mb-6">Send us a message</h2>
						<form className="space-y-6">
							<div>
								<label className="block text-sm font-medium mb-2">Name</label>
								<input 
									type="text" 
									className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Your name"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">Email</label>
								<input 
									type="email" 
									className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="your@email.com"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">Company</label>
								<input 
									type="text" 
									className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Your company"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">Message</label>
								<textarea 
									rows={5}
									className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Tell us about your project..."
								></textarea>
							</div>
							<button 
								type="submit"
								className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white hover:shadow-lg transition-all"
							>
								Send Message
							</button>
						</form>
					</motion.div>

					{/* Contact Information */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="space-y-8"
					>
						<div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
							<h2 className="text-2xl font-bold mb-6">Contact Information</h2>
							<div className="space-y-6">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
										📧
									</div>
									<div>
										<p className="font-medium">Email</p>
										<p className="text-slate-600 dark:text-slate-300">hello@tejaconsulting.com</p>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
										📱
									</div>
									<div>
										<p className="font-medium">Phone</p>
										<p className="text-slate-600 dark:text-slate-300">+1 (555) 123-4567</p>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
										📍
									</div>
									<div>
										<p className="font-medium">Office</p>
										<p className="text-slate-600 dark:text-slate-300">San Francisco, CA</p>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
							<h3 className="text-xl font-bold mb-4">Business Hours</h3>
							<div className="space-y-2 text-slate-600 dark:text-slate-300">
								<p>Monday - Friday: 9:00 AM - 6:00 PM</p>
								<p>Saturday: 10:00 AM - 4:00 PM</p>
								<p>Sunday: Closed</p>
							</div>
						</div>

						<div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl p-8">
							<h3 className="text-xl font-bold mb-4">Find Us</h3>
							<p className="text-slate-600 dark:text-slate-300 mb-4">
								Visit our office in the heart of San Francisco's tech district.
							</p>
							<GoogleMap 
								center={{ lat: 37.7749, lng: -122.4194 }}
								zoom={15}
								className="h-64 w-full rounded-lg shadow-lg"
							/>
							<div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
								<p className="font-medium">Teja Consulting</p>
								<p>123 Market Street, Suite 100</p>
								<p>San Francisco, CA 94105</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
