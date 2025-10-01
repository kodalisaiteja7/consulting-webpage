#!/bin/bash

# Deployment script for Teja Consulting Website
echo "🚀 Starting deployment process..."

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Please install it first:"
    echo "   https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Check if user is logged into Heroku
if ! heroku auth:whoami &> /dev/null; then
    echo "❌ Not logged into Heroku. Please run: heroku login"
    exit 1
fi

echo "✅ Heroku CLI ready"

# Deploy backend to Heroku
echo "📦 Deploying backend to Heroku..."
cd backend
git subtree push --prefix backend heroku main

if [ $? -eq 0 ]; then
    echo "✅ Backend deployed successfully!"
    echo "🔗 Your backend URL: https://your-consulting-backend.herokuapp.com"
else
    echo "❌ Backend deployment failed"
    exit 1
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update Vercel environment variables with your backend URL"
echo "2. Deploy frontend to Vercel"
echo "3. Test your live application"
echo ""
echo "🔗 Frontend deployment: https://vercel.com/new"
echo "📖 Full guide: Check README.md for detailed instructions"
