# 🚀 Production Deployment Guide

This guide will help you deploy your Teja Consulting website to production using Vercel (frontend) and Heroku (backend).

## 📋 Prerequisites

- GitHub account
- Heroku account (free tier available)
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)

## 🗄️ Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [cloud.mongodb.com](https://cloud.mongodb.com)
   - Sign up for free account
   - Create a new project

2. **Create Free Cluster**
   - Click "Build a Database"
   - Choose "M0 Sandbox" (free tier)
   - Select a region close to your users
   - Name your cluster (e.g., "teja-consulting")

3. **Configure Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Give "Read and write to any database" permissions

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add `0.0.0.0/0` for all IPs (or restrict to specific IPs)

5. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` and `<dbname>` with actual values

## 🔧 Step 2: Deploy Backend to Heroku

### 2.1 Install Heroku CLI

**Windows:**
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
# Or use package manager
winget install Heroku.HerokuCLI
```

**macOS:**
```bash
brew tap heroku/brew && brew install heroku
```

**Linux:**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

### 2.2 Create Heroku App

```bash
# Login to Heroku
heroku login

# Create new app (replace with your desired name)
heroku create your-consulting-backend

# Verify app was created
heroku apps
```

### 2.3 Configure Environment Variables

```bash
# Set production environment
heroku config:set NODE_ENV=production

# Set MongoDB connection (replace with your actual connection string)
heroku config:set MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/teja-consulting?retryWrites=true&w=majority"

# Set JWT secret (use a strong, random secret)
heroku config:set JWT_SECRET="your-super-secure-jwt-secret-key-here"

# Set JWT expiration
heroku config:set JWT_EXPIRES_IN="7d"

# Set CORS origin (will update after frontend deployment)
heroku config:set CORS_ORIGIN="https://your-frontend-domain.vercel.app"
```

### 2.4 Deploy Backend

```bash
# Navigate to backend directory
cd backend

# Deploy using git subtree
git subtree push --prefix backend heroku main

# Or if using Heroku CLI from project root
git subtree push --prefix backend heroku main
```

### 2.5 Verify Backend Deployment

```bash
# Check logs
heroku logs --tail

# Test API endpoint
curl https://your-consulting-backend.herokuapp.com/health
```

## 🌐 Step 3: Deploy Frontend to Vercel

### 3.1 Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your repository: `kodalisaiteja7/consulting-webpage`

### 3.2 Configure Build Settings

- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3.3 Set Environment Variables

In Vercel dashboard, go to Project Settings → Environment Variables:

```
VITE_API_URL=https://your-consulting-backend.herokuapp.com/api
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 3.4 Deploy

Click "Deploy" and wait for the build to complete.

## 🗺️ Step 4: Set Up Google Maps

### 4.1 Get API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable "Maps JavaScript API"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key

### 4.2 Secure API Key

1. Click on your API key
2. Go to "Application restrictions"
3. Select "HTTP referrers"
4. Add your domains:
   - `localhost:5173/*` (for development)
   - `your-frontend-domain.vercel.app/*`
   - `*.vercel.app/*` (for preview deployments)

### 4.3 Update Environment Variables

Add the API key to:
- Vercel environment variables
- Your local `.env` file

## 🔄 Step 5: Update CORS Settings

After both deployments are complete, update the backend CORS origin:

```bash
# Update CORS origin with your actual Vercel domain
heroku config:set CORS_ORIGIN="https://your-actual-domain.vercel.app"

# Restart the app to apply changes
heroku restart
```

## ✅ Step 6: Test Your Deployment

### Test Backend
```bash
# Health check
curl https://your-consulting-backend.herokuapp.com/health

# Test jobs API
curl https://your-consulting-backend.herokuapp.com/api/mock/jobs
```

### Test Frontend
1. Visit your Vercel domain
2. Test all pages and functionality
3. Verify Google Maps loads correctly
4. Test job application form
5. Test contact form

## 🛠️ Troubleshooting

### Backend Issues

**Build Failures:**
```bash
# Check build logs
heroku logs --tail

# Check if TypeScript builds correctly locally
cd backend && npm run build
```

**Database Connection:**
```bash
# Verify environment variables
heroku config

# Test MongoDB connection string
```

**CORS Issues:**
```bash
# Update CORS origin
heroku config:set CORS_ORIGIN="https://your-frontend-domain.vercel.app"
heroku restart
```

### Frontend Issues

**Build Failures:**
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify TypeScript compilation

**API Connection:**
- Check VITE_API_URL environment variable
- Verify backend is running
- Check network tab in browser dev tools

**Google Maps Issues:**
- Verify API key is correct
- Check API key restrictions
- Ensure Maps JavaScript API is enabled

## 📊 Monitoring

### Heroku Monitoring
```bash
# View app info
heroku info

# Check dyno usage
heroku ps

# View logs
heroku logs --tail
```

### Vercel Monitoring
- Check deployment status in Vercel dashboard
- Monitor function execution logs
- Check analytics for performance

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, unique secrets
   - Rotate secrets regularly

2. **API Keys**
   - Restrict Google Maps API key to specific domains
   - Monitor API usage
   - Set up billing alerts

3. **Database**
   - Use strong database passwords
   - Restrict network access
   - Enable MongoDB Atlas monitoring

## 💰 Cost Considerations

### Free Tiers
- **Vercel:** 100GB bandwidth, unlimited personal projects
- **Heroku:** 550-1000 free dyno hours per month
- **MongoDB Atlas:** 512MB storage, shared clusters

### Scaling Options
- Upgrade to paid tiers as your application grows
- Consider AWS/GCP for larger scale deployments
- Monitor usage and costs regularly

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Heroku and Vercel documentation
3. Check GitHub issues for common problems
4. Contact support if needed

## 🎉 Success!

Once deployed, your consulting website will be live at:
- **Frontend:** `https://your-domain.vercel.app`
- **Backend:** `https://your-consulting-backend.herokuapp.com`

Your professional consulting website is now ready for the world! 🌟
