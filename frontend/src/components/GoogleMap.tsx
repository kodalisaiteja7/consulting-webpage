import { useEffect, useRef } from 'react';

interface GoogleMapProps {
	center?: { lat: number; lng: number };
	zoom?: number;
	className?: string;
}

export default function GoogleMap({ 
	center = { lat: 37.7749, lng: -122.4194 }, // San Francisco coordinates
	zoom = 15,
	className = "h-64 w-full rounded-lg"
}: GoogleMapProps) {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Load Google Maps API
		const loadGoogleMaps = () => {
			if (window.google && mapRef.current) {
				const map = new window.google.maps.Map(mapRef.current, {
					center: center,
					zoom: zoom,
					styles: [
						{
							featureType: "all",
							elementType: "geometry",
							stylers: [{ color: "#f5f5f5" }]
						},
						{
							featureType: "water",
							elementType: "geometry",
							stylers: [{ color: "#c9c9c9" }]
						},
						{
							featureType: "poi",
							elementType: "labels.text.fill",
							stylers: [{ color: "#757575" }]
						},
						{
							featureType: "poi",
							elementType: "labels.text.stroke",
							stylers: [{ color: "#ffffff" }]
						},
						{
							featureType: "poi",
							elementType: "labels.icon",
							stylers: [{ visibility: "off" }]
						},
						{
							featureType: "road",
							elementType: "geometry",
							stylers: [{ color: "#ffffff" }]
						},
						{
							featureType: "road",
							elementType: "labels.icon",
							stylers: [{ visibility: "off" }]
						},
						{
							featureType: "road",
							elementType: "labels.text.fill",
							stylers: [{ color: "#757575" }]
						},
						{
							featureType: "road",
							elementType: "labels.text.stroke",
							stylers: [{ color: "#ffffff" }]
						}
					]
				});

				// Add a marker
				new window.google.maps.Marker({
					position: center,
					map: map,
					title: "Teja Consulting",
					icon: {
						url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="20" cy="20" r="18" fill="#3B82F6" stroke="#ffffff" stroke-width="2"/>
								<circle cx="20" cy="20" r="8" fill="#ffffff"/>
							</svg>
						`),
						scaledSize: new window.google.maps.Size(40, 40),
						anchor: new window.google.maps.Point(20, 20)
					}
				});
			}
		};

		// Check if Google Maps is already loaded
		if (window.google) {
			loadGoogleMaps();
		} else {
			// Load Google Maps API script
			const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
			if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
				// Show fallback if no API key is provided
				if (mapRef.current) {
					mapRef.current.innerHTML = `
						<div class="flex items-center justify-center h-full bg-slate-200 dark:bg-slate-700 rounded-lg">
							<div class="text-center p-8">
								<div class="text-4xl mb-4">📍</div>
								<h3 class="text-lg font-semibold mb-2">Interactive Map</h3>
								<p class="text-slate-500 dark:text-slate-400 mb-4">
									Add your Google Maps API key to enable the interactive map.
								</p>
								<div class="text-sm text-slate-400">
									<p><strong>Address:</strong></p>
									<p>123 Market Street, Suite 100</p>
									<p>San Francisco, CA 94105</p>
								</div>
							</div>
						</div>
					`;
				}
				return;
			}

			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
			script.async = true;
			script.defer = true;
			script.onload = loadGoogleMaps;
			script.onerror = () => {
				// Fallback if script fails to load
				if (mapRef.current) {
					mapRef.current.innerHTML = `
						<div class="flex items-center justify-center h-full bg-slate-200 dark:bg-slate-700 rounded-lg">
							<div class="text-center p-8">
								<div class="text-4xl mb-4">📍</div>
								<h3 class="text-lg font-semibold mb-2">Location</h3>
								<p class="text-slate-500 dark:text-slate-400 mb-4">
									Map could not be loaded. Please check your internet connection.
								</p>
								<div class="text-sm text-slate-400">
									<p><strong>Address:</strong></p>
									<p>123 Market Street, Suite 100</p>
									<p>San Francisco, CA 94105</p>
								</div>
							</div>
						</div>
					`;
				}
			};
			document.head.appendChild(script);

			return () => {
				if (document.head.contains(script)) {
					document.head.removeChild(script);
				}
			};
		}
	}, [center, zoom]);

	return (
		<div className={className} ref={mapRef}>
			{/* Fallback content while map loads */}
			<div className="flex items-center justify-center h-full bg-slate-200 dark:bg-slate-700 rounded-lg">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
					<p className="text-slate-500 dark:text-slate-400">Loading map...</p>
				</div>
			</div>
		</div>
	);
}

// Extend Window interface for Google Maps
declare global {
	interface Window {
		google: any;
	}
}
