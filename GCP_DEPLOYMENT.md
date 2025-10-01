# 🚀 Google Cloud Platform Deployment Guide

This guide will help you deploy your Teja Consulting website to Google Cloud Platform using Cloud Run, Firestore, and other GCP services.

## 📋 Prerequisites

- Google Cloud Platform account
- Google Cloud CLI installed
- Docker installed (optional, for local testing)
- Domain name (optional, for custom domain)

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Cloud Run)   │───▶│   (Cloud Run)   │───▶│   (Firestore)   │
│   React + Nginx │    │   Node.js API   │    │   NoSQL         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   CDN + SSL     │    │   Load Balancer │
│   (Cloud CDN)   │    │   Auto-scaling  │
└─────────────────┘    └─────────────────┘
```

## 🔧 Step 1: Set Up GCP Project

### 1.1 Create GCP Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `teja-consulting`
4. Click "Create"

### 1.2 Install Google Cloud CLI

**Windows:**
```bash
# Download from https://cloud.google.com/sdk/docs/install
# Or use package manager
winget install Google.CloudSDK
```

**macOS:**
```bash
brew install google-cloud-sdk
```

**Linux:**
```bash
curl https://sdk.cloud.google.com | bash
```

### 1.3 Configure GCP CLI

```bash
# Login to GCP
gcloud auth login

# Set your project
gcloud config set project teja-consulting

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable firestore.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable compute.googleapis.com

# Set default region
gcloud config set run/region us-central1

# Set default zone
gcloud config set compute/zone us-central1-a

# Configure Docker to use gcloud as credential helper
gcloud auth configure-docker
```

## 🗄️ Step 2: Set Up Firestore Database

### 2.1 Create Firestore Database

1. Go to [Firestore Console](https://console.cloud.google.com/firestore)
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location (us-central1 recommended)
5. Click "Create"

### 2.2 Configure Firestore Rules

Go to Firestore → Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to jobs collection
    match /jobs/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow read/write access to applications collection
    match /applications/{document} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
  }
}
```

## 🐳 Step 3: Deploy Backend to Cloud Run

### 3.1 Quick Deployment

```bash
# Navigate to project root
cd consulting-site

# Run the automated deployment script
chmod +x deploy-gcp.sh
./deploy-gcp.sh
```

### 3.2 Manual Deployment

```bash
# Navigate to backend directory
cd backend

# Build and deploy backend
gcloud builds submit --tag gcr.io/teja-consulting/consulting-backend
gcloud run deploy consulting-backend \
  --image gcr.io/teja-consulting/consulting-backend \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,PORT=8080
```

### 3.3 Configure Environment Variables

```bash
# Set environment variables for backend
gcloud run services update consulting-backend \
  --region us-central1 \
  --set-env-vars NODE_ENV=production,PORT=8080,CORS_ORIGIN=https://your-frontend-url

# Get the backend URL
gcloud run services describe consulting-backend --region us-central1 --format 'value(status.url)'
```

## 🌐 Step 4: Deploy Frontend to Cloud Run

### 4.1 Build and Deploy Frontend

```bash
# Navigate to frontend directory
cd frontend

# Build and deploy frontend
gcloud builds submit --tag gcr.io/teja-consulting/consulting-frontend
gcloud run deploy consulting-frontend \
  --image gcr.io/teja-consulting/consulting-frontend \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 80
```

### 4.2 Configure Frontend Environment Variables

```bash
# Get backend URL first
BACKEND_URL=$(gcloud run services describe consulting-backend --region us-central1 --format 'value(status.url)')

# Set environment variables for frontend
gcloud run services update consulting-frontend \
  --region us-central1 \
  --set-env-vars VITE_API_URL=$BACKEND_URL/api,VITE_GOOGLE_MAPS_API_KEY=your-maps-api-key
```

## 🗺️ Step 5: Set Up Google Maps API

### 5.1 Enable Maps API

```bash
# Enable Maps JavaScript API
gcloud services enable maps-backend.googleapis.com
```

### 5.2 Create API Key

1. Go to [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" → "API Key"
3. Copy the API key
4. Click "Restrict Key"
5. Under "Application restrictions", select "HTTP referrers"
6. Add your domains:
   - `localhost:*` (for development)
   - `your-frontend-url/*`
   - `*.run.app/*`

### 5.3 Update Environment Variables

```bash
# Update frontend with Maps API key
gcloud run services update consulting-frontend \
  --region us-central1 \
  --set-env-vars VITE_GOOGLE_MAPS_API_KEY=your-actual-maps-api-key
```

## 🌍 Step 6: Set Up Custom Domain (Optional)

### 6.1 Map Custom Domain

```bash
# Map your domain to Cloud Run service
gcloud run domain-mappings create \
  --service consulting-frontend \
  --domain your-domain.com \
  --region us-central1
```

### 6.2 Configure DNS

Add the following DNS records to your domain provider:

```
Type: CNAME
Name: www
Value: ghs.googlehosted.com

Type: A
Name: @
Value: [IP address provided by gcloud command]
```

## 🔧 Step 7: Set Up CI/CD with Cloud Build

### 7.1 Create Build Triggers

```bash
# Create build trigger for backend
gcloud builds triggers create github \
  --repo-name=consulting-webpage \
  --repo-owner=kodalisaiteja7 \
  --branch-pattern="^main$" \
  --build-config=backend/cloudbuild.yaml

# Create build trigger for frontend
gcloud builds triggers create github \
  --repo-name=consulting-webpage \
  --repo-owner=kodalisaiteja7 \
  --branch-pattern="^main$" \
  --build-config=frontend/cloudbuild.yaml
```

### 7.2 Configure Automatic Deployments

Every push to the `main` branch will automatically trigger:
1. Docker image build
2. Push to Container Registry
3. Deploy to Cloud Run

## 📊 Step 8: Monitoring and Logging

### 8.1 View Logs

```bash
# View backend logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=consulting-backend" --limit 50

# View frontend logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=consulting-frontend" --limit 50
```

### 8.2 Monitor Performance

1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Click on your services to view metrics
3. Set up alerts for errors and performance

## 💰 Step 9: Cost Optimization

### 9.1 Free Tier Limits

- **Cloud Run**: 2 million requests/month, 400,000 GB-seconds
- **Firestore**: 1 GB storage, 50,000 reads, 20,000 writes
- **Cloud Build**: 120 build-minutes/day

### 9.2 Cost Management

```bash
# Set up billing alerts
gcloud billing budgets create \
  --billing-account=YOUR_BILLING_ACCOUNT_ID \
  --display-name="Consulting Website Budget" \
  --budget-amount=10USD

# Monitor costs
gcloud billing budgets list
```

## 🧪 Step 10: Testing Your Deployment

### 10.1 Test Backend

```bash
# Get backend URL
BACKEND_URL=$(gcloud run services describe consulting-backend --region us-central1 --format 'value(status.url)')

# Test health endpoint
curl $BACKEND_URL/health

# Test API endpoints
curl $BACKEND_URL/api/mock/jobs
```

### 10.2 Test Frontend

```bash
# Get frontend URL
FRONTEND_URL=$(gcloud run services describe consulting-frontend --region us-central1 --format 'value(status.url)')

# Open in browser
echo "Frontend URL: $FRONTEND_URL"
```

## 🛠️ Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Check build logs
gcloud builds log [BUILD_ID]

# Test Docker build locally
docker build -t test-backend ./backend
docker run -p 8080:8080 test-backend
```

**Service Not Starting:**
```bash
# Check service logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=consulting-backend" --limit 20

# Check environment variables
gcloud run services describe consulting-backend --region us-central1
```

**CORS Issues:**
```bash
# Update CORS origin
gcloud run services update consulting-backend \
  --region us-central1 \
  --set-env-vars CORS_ORIGIN=https://your-frontend-url
```

**Firestore Connection:**
```bash
# Check Firestore rules
# Ensure service account has proper permissions
# Verify Firestore is enabled in the project
```

## 🔒 Security Best Practices

### 10.1 Environment Variables
- Use Secret Manager for sensitive data
- Never commit API keys to repository
- Rotate keys regularly

### 10.2 Network Security
- Use HTTPS only
- Configure proper CORS settings
- Set up VPC if needed

### 10.3 Database Security
- Use Firestore security rules
- Enable audit logging
- Regular security reviews

## 📈 Scaling and Performance

### Auto-scaling
Cloud Run automatically scales based on:
- Request volume
- CPU utilization
- Memory usage

### Performance Optimization
- Use Cloud CDN for static assets
- Optimize Docker images
- Monitor and tune resource allocation

## 🎉 Success!

Your consulting website is now deployed on Google Cloud Platform with:
- ✅ **Frontend**: Cloud Run with Nginx
- ✅ **Backend**: Cloud Run with Node.js
- ✅ **Database**: Firestore
- ✅ **CI/CD**: Cloud Build
- ✅ **Monitoring**: Cloud Logging
- ✅ **SSL**: Automatic HTTPS
- ✅ **Scaling**: Auto-scaling

## 🔗 Useful Commands

```bash
# Get service URLs
gcloud run services list --region us-central1

# Update environment variables
gcloud run services update SERVICE_NAME --region us-central1 --set-env-vars KEY=VALUE

# View logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=SERVICE_NAME"

# Delete services (if needed)
gcloud run services delete SERVICE_NAME --region us-central1
```

## 📞 Support

For issues:
1. Check [Google Cloud Documentation](https://cloud.google.com/docs)
2. Visit [Cloud Run Troubleshooting](https://cloud.google.com/run/docs/troubleshooting)
3. Check [Firestore Documentation](https://cloud.google.com/firestore/docs)

Your professional consulting website is now running on Google Cloud Platform! 🌟
