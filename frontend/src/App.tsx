import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';
import Home from './components/Home';
import Footer from './components/Footer';
import JobsPage from './pages/Jobs';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import ContactPage from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';

function useDarkMode() {
	const [enabled, setEnabled] = useState<boolean>(() => {
		return localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
	});
	useEffect(() => {
		const root = document.documentElement;
		if (enabled) {
			root.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			root.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [enabled]);
	return { enabled, setEnabled };
}

const Page = ({ children }: { children: React.ReactNode }) => (
	<motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }} className="min-h-[80vh]">
		{children}
	</motion.main>
);

function Navigation() {
	const location = useLocation();
	const [activeSection] = useState('hero');
	
	// Only show scroll-based navigation on home page
	if (location.pathname !== '/') {
		return (
			<nav className="hidden gap-6 md:flex">
				<Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
				<Link to="/services" className="hover:text-blue-600 transition-colors">Services</Link>
				<Link to="/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link>
				<Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
			</nav>
		);
	}

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<nav className="hidden gap-6 md:flex">
			<button 
				onClick={() => scrollToSection('about')}
				className={`hover:text-blue-600 transition-colors ${activeSection === 'about' ? 'text-blue-600' : ''}`}
			>
				About
			</button>
			<button 
				onClick={() => scrollToSection('services')}
				className={`hover:text-blue-600 transition-colors ${activeSection === 'services' ? 'text-blue-600' : ''}`}
			>
				Services
			</button>
			<button 
				onClick={() => scrollToSection('jobs')}
				className={`hover:text-blue-600 transition-colors ${activeSection === 'jobs' ? 'text-blue-600' : ''}`}
			>
				Jobs
			</button>
			<button 
				onClick={() => scrollToSection('contact')}
				className={`hover:text-blue-600 transition-colors ${activeSection === 'contact' ? 'text-blue-600' : ''}`}
			>
				Contact
			</button>
		</nav>
	);
}

export default function App() {
	const { enabled, setEnabled } = useDarkMode();
	return (
		<BrowserRouter>
			<div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
				<header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-950/70">
					<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
						<Link to="/" className="font-bold tracking-tight text-xl">
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Teja Consulting
							</span>
						</Link>
						<Navigation />
						<button 
							onClick={() => setEnabled(!enabled)} 
							aria-label="Toggle dark mode" 
							className="rounded-full border border-slate-300 px-3 py-1 text-sm dark:border-slate-700 hover:border-blue-500 transition-colors"
						>
							{enabled ? '🌙' : '☀️'}
						</button>
					</div>
				</header>
				<AnimatePresence mode="wait">
					<Suspense fallback={<div className="p-6">Loading...</div>}>
						<Routes>
							<Route index element={<Home />} />
							<Route path="/about" element={<Page><AboutPage /></Page>} />
							<Route path="/services" element={<Page><ServicesPage /></Page>} />
							<Route path="/jobs" element={<Page><JobsPage /></Page>} />
							<Route path="/contact" element={<Page><ContactPage /></Page>} />
							<Route path="/privacy" element={<Page><PrivacyPolicy /></Page>} />
						</Routes>
					</Suspense>
				</AnimatePresence>
				<Footer />
			</div>
		</BrowserRouter>
	);
}
