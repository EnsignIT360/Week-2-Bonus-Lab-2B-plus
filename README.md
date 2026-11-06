# Wasatch Front Fall Sports Schedule

A React app built with Vite. It loads the game list from `public/schedule.json`, lets visitors filter by field, and provides in-page cancel and reinstate controls. The footer shows the short commit SHA used for the build.

## Run locally

```bash
npm ci
npm test
npm run dev
```

## GitHub Actions and Azure

The workflow runs tests and a production build for pull requests into `main`. Pull requests do not deploy. Pushes to `main` build the app and deploy `dist/` to Azure App Service.

Set these repository Actions secrets:

- `AZURE_WEBAPP_NAME`: the Azure Web App name.
- `AZURE_WEBAPP_PUBLISH_PROFILE`: the complete publish profile XML.

The Azure Web App should use Linux with Node.js 22. Set its startup command to:

```text
pm2 serve /home/site/wwwroot --no-daemon --spa
```

The live site is [2weekbonus](https://2weekbonus-hacshvb6cmeuaqeq.westus3-01.azurewebsites.net/).
