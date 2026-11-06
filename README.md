# React CI/CD Lab

A React starter app built with Vite, with a GitHub Actions workflow that builds the app and deploys `dist/` to Azure App Service on every push to `main`.

## Run locally

```bash
npm install
npm run dev
```

## Azure setup

1. Create an Azure Web App configured for **Node.js 22** on Linux.
2. In the Web App's **Configuration > General settings**, set **Startup Command** to `pm2 serve /home/site/wwwroot --no-daemon --spa` so client-side routes fall back to `index.html`.
3. Download the Web App's publish profile from the Azure Portal.
4. In the GitHub repository, add these Actions secrets:
   - `AZURE_WEBAPP_NAME`: the Web App name.
   - `AZURE_WEBAPP_PUBLISH_PROFILE`: the full publish profile XML.
5. Push this project to the repository's `main` branch. The workflow builds the Vite app and deploys the generated `dist/` directory.

The attached lab guide covers the GitHub Actions/Azure deployment sequence, but its sample application is Express rather than React. This project uses the same deployment flow with a Vite production build.


Live Site:
https://2weekbonus-hacshvb6cmeuaqeq.westus3-01.azurewebsites.net/
