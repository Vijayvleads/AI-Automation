# AI Social Content Automator

A dashboard to manage and monitor a self-hosted automation that curates AI news, generates social media content with a consistent brand voice, and visualizes the posting schedule, powered by the Google Gemini API.

This is a single-page application built with React and TypeScript. It includes a lightweight build process using `esbuild` to prepare the application for production deployment.

## How Deployment Works

This project is configured for deployment on Vercel. Here's a quick overview of the process:

1.  **Environment Variable**: Vercel allows you to securely store your Google Gemini API key as an environment variable named `API_KEY`.
2.  **Build Process**: When you deploy, Vercel runs the `npm run build` command defined in `package.json`. This executes our custom `build.js` script.
3.  **Bundling**: The `build.js` script uses `esbuild` to bundle all the JavaScript/TypeScript code into a single, optimized file (`dist/index.js`).
4.  **API Key Injection**: During this bundling process, `esbuild` safely injects your `API_KEY` from Vercel's environment into the bundled code. This means your key is not exposed in your source code.
5.  **Output**: The script creates a `dist` folder with the final `index.html` and `index.js`, which is what Vercel serves to your visitors.

## Deployment to Vercel

You can deploy this application to Vercel in a few simple steps.

### Option 1: One-Click Deploy

Use the button below to clone this repository to your own GitHub account and deploy it to Vercel automatically.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2FYOUR_REPO_NAME&env=API_KEY&envDescription=Your%20Google%20Gemini%20API%20Key&project-name=ai-social-content-automator&repository-name=ai-social-content-automator)

**Important:** For the button to work, you must first push this project's code to your own public GitHub repository. Then, edit this `README.md` file and replace `YOUR_USERNAME/YOUR_REPO_NAME` in the URL above with your actual GitHub username and repository name.

### Option 2: Manual Deployment via Git

1.  Create a new repository on GitHub, GitLab, or Bitbucket and push the project code to it.
2.  Go to your [Vercel dashboard](https://vercel.com/dashboard) and select **Add New... > Project**.
3.  Import your Git repository.
4.  Vercel will automatically detect the build settings from the `vercel.json` file.
5.  Before deploying, expand the **Environment Variables** section.
6.  Add a new variable:
    - **Name**: `API_KEY`
    - **Value**: Your Google Gemini API key.
7.  Click **Deploy**. Vercel will handle the rest, and your application will be live shortly.

### Option 3: Deployment via Vercel CLI

If you prefer using the command line:

1.  Install the Vercel CLI globally: `npm install -g vercel`.
2.  In your project's root directory, run `vercel` to link the project to your Vercel account.
3.  Add your API key as a Vercel secret. This command will prompt you to enter the key value securely.
    ```bash
    vercel env add API_KEY
    ```
4.  Deploy your project to production.
    ```bash
    vercel --prod
    ```

Your application will be built and deployed to a public URL.
