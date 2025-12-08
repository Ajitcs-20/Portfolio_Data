# GitHub Pages Deployment Guide

## Setup Instructions

### 1. Add Secrets to GitHub Repository

Go to your repository settings and add the following secret:

- **Secret Name:** `VITE_GEMINI_API_KEY`
- **Secret Value:** Your Gemini API key

**Steps:**
1. Navigate to `Settings` → `Secrets and variables` → `Actions`
2. Click `New repository secret`
3. Add `VITE_GEMINI_API_KEY` with your API key
4. Save

### 2. Configure GitHub Pages

1. Go to `Settings` → `Pages`
2. Under "Build and deployment":
   - **Source:** Select `GitHub Actions`
3. Save

### 3. Enable Actions

1. Go to `Actions` tab
2. Enable GitHub Actions for your repository

## Deployment

The portfolio will automatically deploy to GitHub Pages when you:
- Push to the `main` branch
- The workflow in `.github/workflows/deploy.yml` runs automatically

## Access Your Portfolio

Your portfolio will be available at:
- **User Pages:** `https://username.github.io`
- **Project Pages:** `https://username.github.io/Portfolio_Data`

**Note:** Update the `base` path in `vite.config.ts` if you're using project pages vs user pages.

## Workflow Details

The deployment workflow:
1. Triggers on push to `main` or pull requests
2. Installs dependencies
3. Builds the project with your Gemini API key
4. Uploads the build artifact
5. Deploys to GitHub Pages

## Local Testing

To test locally with GitHub Pages settings:

```powershell
$env:GITHUB_PAGES = 'true'
npm run build
npm run preview
```

## Troubleshooting

- **Build fails:** Ensure `VITE_GEMINI_API_KEY` is set in repository secrets
- **Blank page:** Check if the `base` path in `vite.config.ts` matches your repository URL
- **Assets missing:** Verify the base path configuration for your GitHub Pages setup
