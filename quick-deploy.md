# 🚀 Quick Deployment Commands

## Prerequisites
- Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
- Create MongoDB Atlas account: https://cloud.mongodb.com
- Create Vercel account: https://vercel.com
- Get Google Maps API key: https://console.cloud.google.com

## 1. MongoDB Atlas Setup
```
1. Create free cluster (M0 Sandbox)
2. Create database user with read/write permissions
3. Add IP address: 0.0.0.0/0
4. Get connection string
```

## 2. Backend Deployment (Heroku)
```bash
# Login to Heroku
heroku login

# Create app
heroku create teja-consulting-backend

# Set environment variables (replace with your values)
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/teja-consulting?retryWrites=true&w=majority"
heroku config:set JWT_SECRET="your-super-secure-jwt-secret"
heroku config:set JWT_EXPIRES_IN="7d"

# Deploy
cd backend
git subtree push --prefix backend heroku main

# Get backend URL
heroku apps:info
```

## 3. Frontend Deployment (Vercel)
```
1. Go to vercel.com
2. Import GitHub repository: kodalisaiteja7/consulting-webpage
3. Set root directory: frontend
4. Add environment variables:
   - VITE_API_URL=https://teja-consulting-backend.herokuapp.com/api
   - VITE_GOOGLE_MAPS_API_KEY=your-maps-api-key
5. Deploy
```

## 4. Update CORS (After frontend deployment)
```bash
# Update CORS with your actual Vercel domain
heroku config:set CORS_ORIGIN="https://your-actual-vercel-domain.vercel.app"
```

## 5. Test Your Deployment
```bash
# Test backend
curl https://teja-consulting-backend.herokuapp.com/health

# Test frontend
# Visit your Vercel URL in browser
```

## Environment Variables Summary

### Heroku (Backend)
- NODE_ENV=production
- MONGO_URI=your-mongodb-connection-string
- JWT_SECRET=your-jwt-secret
- JWT_EXPIRES_IN=7d
- CORS_ORIGIN=https://your-frontend-domain.vercel.app

### Vercel (Frontend)
- VITE_API_URL=https://teja-consulting-backend.herokuapp.com/api
- VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

## URLs After Deployment
- Frontend: https://your-project.vercel.app
- Backend: https://teja-consulting-backend.herokuapp.com
- API Health: https://teja-consulting-backend.herokuapp.com/health
- API Jobs: https://teja-consulting-backend.herokuapp.com/api/mock/jobs
