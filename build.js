const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const distDir = 'dist';

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Build the application
esbuild.build({
    entryPoints: ['index.tsx'],
    bundle: true,
    outfile: path.join(distDir, 'index.js'),
    minify: true,
    sourcemap: 'inline',
    define: {
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
    },
}).then(() => {
    // Read original index.html
    let html = fs.readFileSync('index.html', 'utf-8');

    // Remove importmap and change script src to the bundled file
    html = html.replace(/<script type="importmap">[\s\S]*?<\/script>\s*/, '');
    html = html.replace('<script type="module" src="/index.tsx"></script>', '<script src="/index.js" defer></script>');
    
    // Write new index.html to dist
    fs.writeFileSync(path.join(distDir, 'index.html'), html);

    console.log('Build successful! Output is in the /dist directory.');
}).catch((err) => {
    console.error("Build failed:", err);
    process.exit(1);
});
