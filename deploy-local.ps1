# Local deployment script for testing
Write-Host "🚀 Deploying to GCP from local machine..." -ForegroundColor Green

# Check if gcloud CLI is installed
gcloud version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Google Cloud CLI not found. Please install it first." -ForegroundColor Red
    exit 1
}

# Get current project
$PROJECT_ID = gcloud config get-value project 2>$null
if (-not $PROJECT_ID) {
    Write-Host "❌ No GCP project selected. Please run: gcloud config set project YOUR_PROJECT_ID" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Current project: $PROJECT_ID" -ForegroundColor Cyan

# Submit to Cloud Build
Write-Host "🔨 Submitting build to Google Cloud Build..." -ForegroundColor Yellow
gcloud builds submit --config cloudbuild.yaml .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Your services should be available at:" -ForegroundColor Cyan
    Write-Host "Backend: https://consulting-backend-$(echo $PROJECT_ID | tr -d "-").uc.r.appspot.com" -ForegroundColor White
    Write-Host "Frontend: https://consulting-frontend-$(echo $PROJECT_ID | tr -d "-").uc.r.appspot.com" -ForegroundColor White
} else {
    Write-Host "❌ Deployment failed. Check the logs above for details." -ForegroundColor Red
}
