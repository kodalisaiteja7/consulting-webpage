import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
	const lastUpdated = "December 2024";

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
			<div className="mx-auto max-w-4xl px-6 py-24">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Privacy Policy
						</span>
					</h1>
					<p className="text-xl text-slate-600 dark:text-slate-300">
						Last updated: {lastUpdated}
					</p>
				</motion.div>

				{/* Content */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="prose prose-lg max-w-none dark:prose-invert"
				>
					{/* Introduction */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							Introduction
						</h2>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
							Teja Consulting ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
						</p>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed">
							Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.
						</p>
					</section>

					{/* Information We Collect */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							Information We Collect
						</h2>
						
						<h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
							Personal Information
						</h3>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
							We may collect personal information that you voluntarily provide to us when you:
						</p>
						<ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-6 space-y-2">
							<li>Fill out contact forms or request information</li>
							<li>Apply for job positions through our careers page</li>
							<li>Subscribe to our newsletter or marketing communications</li>
							<li>Engage with our services</li>
							<li>Communicate with us via email, phone, or other means</li>
						</ul>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
							This information may include:
						</p>
						<ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-6 space-y-2">
							<li>Name and contact information (email, phone number, address)</li>
							<li>Professional information (resume, cover letter, work history)</li>
							<li>Company information (if applicable)</li>
							<li>Any other information you choose to provide</li>
						</ul>

						<h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
							Automatically Collected Information
						</h3>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
							We may automatically collect certain information when you visit our website:
						</p>
						<ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-6 space-y-2">
							<li>IP address and location data</li>
							<li>Browser type and version</li>
							<li>Operating system</li>
							<li>Pages visited and time spent on our site</li>
							<li>Referring website information</li>
							<li>Device information</li>
						</ul>
					</section>

					{/* How We Use Information */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							How We Use Your Information
						</h2>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
							We use the information we collect for various purposes, including:
						</p>
						<ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-6 space-y-2">
							<li>Providing and improving our services</li>
							<li>Responding to your inquiries and requests</li>
							<li>Processing job applications and communicating about employment opportunities</li>
							<li>Sending newsletters and marketing communications (with your consent)</li>
							<li>Analyzing website usage and improving user experience</li>
							<li>Complying with legal obligations</li>
							<li>Protecting our rights and interests</li>
						</ul>
					</section>

					{/* Information Sharing */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							Information Sharing and Disclosure
						</h2>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
							We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
						</p>
						<ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-6 space-y-2">
							<li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and providing services</li>
							<li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
							<li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
							<li><strong>Consent:</strong> With your explicit consent for other purposes</li>
						</ul>
					</section>

					{/* Data Security */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							Data Security
						</h2>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
							We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
						</p>
					</section>

					{/* Cookies and Tracking */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							Cookies and Tracking Technologies
						</h2>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
							We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small text files stored on your device that help us:
						</p>
						<ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-6 space-y-2">
							<li>Remember your preferences and settings</li>
							<li>Analyze website traffic and usage patterns</li>
							<li>Improve website functionality and user experience</li>
						</ul>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed">
							You can control cookie settings through your browser preferences. However, disabling cookies may affect website functionality.
						</p>
					</section>

					{/* Your Rights */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							Your Rights
						</h2>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
							Depending on your location, you may have certain rights regarding your personal information:
						</p>
						<ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-6 space-y-2">
							<li>Access and review your personal information</li>
							<li>Request correction of inaccurate information</li>
							<li>Request deletion of your personal information</li>
							<li>Object to processing of your information</li>
							<li>Request data portability</li>
							<li>Withdraw consent for marketing communications</li>
						</ul>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed">
							To exercise these rights, please contact us using the information provided below.
						</p>
					</section>

					{/* Data Retention */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							Data Retention
						</h2>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
							We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
						</p>
					</section>

					{/* Third-Party Links */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							Third-Party Links
						</h2>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed">
							Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
						</p>
					</section>

					{/* Children's Privacy */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							Children's Privacy
						</h2>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed">
							Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
						</p>
					</section>

					{/* Changes to Privacy Policy */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							Changes to This Privacy Policy
						</h2>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed">
							We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
						</p>
					</section>

					{/* Contact Information */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
							Contact Us
						</h2>
						<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
							If you have any questions about this Privacy Policy or our privacy practices, please contact us:
						</p>
						<div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl p-6">
							<div className="space-y-3">
								<div className="flex items-center space-x-3">
									<span className="text-blue-600 dark:text-blue-400">📧</span>
									<a href="mailto:privacy@tejaconsulting.com" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
										privacy@tejaconsulting.com
									</a>
								</div>
								<div className="flex items-center space-x-3">
									<span className="text-blue-600 dark:text-blue-400">📱</span>
									<a href="tel:+15551234567" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
										+1 (555) 123-4567
									</a>
								</div>
								<div className="flex items-center space-x-3">
									<span className="text-blue-600 dark:text-blue-400">📍</span>
									<span className="text-slate-700 dark:text-slate-300">
										Teja Consulting<br />
										123 Market Street, Suite 100<br />
										San Francisco, CA 94105
									</span>
								</div>
							</div>
						</div>
					</section>
				</motion.div>
			</div>
		</div>
	);
}
