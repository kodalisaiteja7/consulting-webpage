#!/bin/bash

# GCP Deployment Script for Teja Consulting Website
echo "🚀 Starting GCP deployment process..."

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud CLI not found. Please install it first:"
    echo "   https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is logged in
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | head -n1 &> /dev/null; then
    echo "❌ Not logged into Google Cloud. Please run: gcloud auth login"
    exit 1
fi

echo "✅ Google Cloud CLI ready"

# Get current project
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT_ID" ]; then
    echo "❌ No GCP project selected. Please run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo "📁 Current project: $PROJECT_ID"

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable firestore.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Set default region
gcloud config set run/region us-central1

echo "✅ APIs enabled and region set"

# Deploy backend
echo "📦 Deploying backend to Cloud Run..."
cd backend

# Build and deploy backend
gcloud builds submit --tag gcr.io/$PROJECT_ID/consulting-backend
gcloud run deploy consulting-backend \
  --image gcr.io/$PROJECT_ID/consulting-backend \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,PORT=8080

if [ $? -eq 0 ]; then
    echo "✅ Backend deployed successfully!"
    BACKEND_URL=$(gcloud run services describe consulting-backend --region us-central1 --format 'value(status.url)')
    echo "🔗 Backend URL: $BACKEND_URL"
else
    echo "❌ Backend deployment failed"
    exit 1
fi

cd ..

# Deploy frontend
echo "🌐 Deploying frontend to Cloud Run..."
cd frontend

# Build and deploy frontend
gcloud builds submit --tag gcr.io/$PROJECT_ID/consulting-frontend
gcloud run deploy consulting-frontend \
  --image gcr.io/$PROJECT_ID/consulting-frontend \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 80

if [ $? -eq 0 ]; then
    echo "✅ Frontend deployed successfully!"
    FRONTEND_URL=$(gcloud run services describe consulting-frontend --region us-central1 --format 'value(status.url)')
    echo "🔗 Frontend URL: $FRONTEND_URL"
else
    echo "❌ Frontend deployment failed"
    exit 1
fi

cd ..

# Update CORS settings
echo "🔧 Updating CORS settings..."
gcloud run services update consulting-backend \
  --region us-central1 \
  --set-env-vars CORS_ORIGIN=$FRONTEND_URL

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Your services:"
echo "🔗 Frontend: $FRONTEND_URL"
echo "🔗 Backend: $BACKEND_URL"
echo ""
echo "📋 Next steps:"
echo "1. Set up Firestore database in GCP Console"
echo "2. Configure Google Maps API key"
echo "3. Update environment variables if needed"
echo "4. Test your live application"
echo ""
echo "📖 For detailed instructions, see GCP_DEPLOYMENT.md"
echo "🔧 Manage your services: https://console.cloud.google.com/run"
