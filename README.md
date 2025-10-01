# Teja Consulting Website

A modern, responsive consulting website built with React, Node.js, and MongoDB.

## Features

- 🎨 **Modern Design**: Beautiful gradient backgrounds, animations, and responsive layout
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive**: Works perfectly on all devices
- ⚡ **Fast**: Optimized for performance with lazy loading
- 🗺️ **Interactive Maps**: Google Maps integration for contact page
- 💼 **Job Portal**: Complete job listing and application system
- 📧 **Contact Forms**: Functional contact and job application forms
- 🎭 **Animations**: Smooth transitions with Framer Motion

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hook Form** with Zod validation

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Multer** for file uploads
- **Security middleware** (Helmet, CORS, Rate limiting)

## Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- Google Maps API key (optional)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd consulting-site

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

2. **Set up environment variables:**

**Backend (.env):**
```env
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/teja-consulting
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:4000/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

3. **Start MongoDB:**
```bash
# Using Docker Compose
docker-compose up -d

# Or start your local MongoDB instance
```

4. **Run the development servers:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

5. **Visit the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

## Google Maps Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Maps JavaScript API
4. Create an API key
5. Add the API key to your frontend `.env` file

## Project Structure

```
consulting-site/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   └── scripts/         # Database seeding
│   └── package.json
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utilities and API client
│   │   └── index.css        # Global styles
│   └── package.json
└── docker-compose.yml       # MongoDB setup
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (admin)
- `PUT /api/jobs/:id` - Update job (admin)
- `DELETE /api/jobs/:id` - Delete job (admin)

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications` - Get applications (admin)

### Mock Endpoints (no DB required)
- `GET /api/mock/jobs` - Get mock jobs
- `POST /api/mock/applications` - Submit mock application

## Features Overview

### Home Page
- Hero section with animated gradient text
- About section with company information
- Services overview with hover effects
- Client testimonials
- Featured job listings
- Call-to-action sections

### About Page
- Company story and values
- Team member profiles
- Mission and vision
- Company statistics

### Services Page
- Detailed service descriptions
- Interactive service cards
- Process overview
- Technology stack

### Jobs Page
- Job listings with search and filters
- Job application modal
- Application form with validation
- File upload for resumes

### Contact Page
- Contact form with validation
- Google Maps integration
- Office information
- Social media links

### Footer
- Company information
- Quick links
- Social media links
- Newsletter signup
- Contact details

## Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting platform

### Backend (Heroku/Railway)
1. Set up environment variables
2. Deploy the backend code
3. Connect to MongoDB Atlas or your preferred database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email hello@tejaconsulting.com or create an issue in the repository.
