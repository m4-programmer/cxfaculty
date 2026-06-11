import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { previewNavLinks, previewPages } from '../preview/fixtures.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist-preview');
const manifestPath = path.join(root, 'public/build/manifest.json');
const fontsManifestPath = path.join(root, 'public/build/fonts-manifest.json');

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function copyDir(source, destination) {
    ensureDir(destination);

    for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
        const from = path.join(source, entry.name);
        const to = path.join(destination, entry.name);

        if (entry.isDirectory()) {
            copyDir(from, to);
            continue;
        }

        fs.copyFileSync(from, to);
    }
}

function collectCss(manifest, keys) {
    const css = new Set();
    const visited = new Set();

    function walk(key) {
        if (!key || visited.has(key)) {
            return;
        }

        visited.add(key);

        const chunk = manifest[key];
        if (!chunk) {
            return;
        }

        if (key.endsWith('.css') && chunk.file) {
            css.add(chunk.file);
        }

        chunk.css?.forEach((file) => css.add(file));
        chunk.imports?.forEach(walk);
    }

    keys.forEach(walk);
    walk('resources/css/app.css');

    return [...css];
}

function resolveOutputPath(url) {
    if (url === '/') {
        return 'index.html';
    }

    const trimmed = url.replace(/^\//, '').replace(/\/$/, '');

    return path.join(trimmed, 'index.html');
}

function buildAssetTags(manifest, fontsManifest, pageComponent) {
    const pageKey = `resources/js/pages/${pageComponent}.tsx`;
    const cssFiles = collectCss(manifest, [pageKey, 'resources/js/app.tsx']);
    const tags = [];

    if (fontsManifest?.style?.file) {
        tags.push(`<link rel="stylesheet" href="/build/${fontsManifest.style.file}" />`);
    }

    cssFiles.forEach((file) => {
        tags.push(`<link rel="stylesheet" href="/build/${file}" />`);
    });

    fontsManifest?.preloads?.forEach((preload) => {
        tags.push(
            `<link rel="preload" href="/build/${preload.file}" as="${preload.as}" type="${preload.type}" crossorigin="${preload.crossorigin ?? 'anonymous'}" />`,
        );
    });

    tags.push(`<script type="module" src="/build/${manifest['resources/js/app.tsx'].file}"></script>`);
    tags.push(`<script type="module" src="/build/${manifest[pageKey].file}"></script>`);

    return tags.join('\n        ');
}

function buildPreviewBanner() {
    const links = previewNavLinks
        .map((link) => `<a href="${link.url}" style="color:#fde68a;text-decoration:none;font-weight:600;">${link.label}</a>`)
        .join('<span style="opacity:.35;">·</span>');

    return `
        <div id="preview-banner" style="position:fixed;inset:0 0 auto 0;z-index:9999;background:#451a03;color:#fef3c7;border-bottom:1px solid rgba(251,191,36,.35);padding:.65rem 1rem;font:500 12px/1.4 'DM Sans',system-ui,sans-serif;">
            <div style="max-width:80rem;margin:0 auto;display:flex;flex-wrap:wrap;gap:.65rem;align-items:center;justify-content:space-between;">
                <strong style="letter-spacing:.08em;text-transform:uppercase;">Static preview</strong>
                <span style="opacity:.85;">Forms and login are disabled — browse the UI and share feedback.</span>
                <nav style="display:flex;flex-wrap:wrap;gap:.55rem;align-items:center;">${links}</nav>
            </div>
        </div>
        <style>
            body { padding-top: 3.25rem !important; }
            @media (max-width: 768px) {
                body { padding-top: 5.5rem !important; }
            }
        </style>
    `.trim();
}

function encodePageJson(pageData) {
    return JSON.stringify(pageData).replace(/\//g, '\\/');
}

function buildHtml(page, manifest, fontsManifest) {
    const pageData = {
        component: page.component,
        props: page.props,
        url: page.url,
        version: 'preview',
        clearHistory: false,
        encryptHistory: false,
    };

    const pageJson = encodePageJson(pageData);

    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <meta name="description" content="CX Faculty static preview for client feedback.">
        <meta name="theme-color" content="#000000">
        <meta name="robots" content="noindex, nofollow">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <title>${page.title}</title>
        ${buildAssetTags(manifest, fontsManifest, page.component)}
        <style>
            html { scroll-behavior: smooth; }
            body { min-height: 100vh; }
            .landing-body { font-family: 'DM Sans', sans-serif; }
        </style>
    </head>
    <body class="font-sans antialiased landing-body">
        ${buildPreviewBanner()}
        <script data-page="app" type="application/json">${pageJson}</script>
        <div id="app"></div>
    </body>
</html>`;
}

function copyPublicAssets() {
    const publicDir = path.join(root, 'public');
    const assetNames = ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'robots.txt'];

    assetNames.forEach((name) => {
        const source = path.join(publicDir, name);
        if (fs.existsSync(source)) {
            fs.copyFileSync(source, path.join(distDir, name));
        }
    });

    const imagesDir = path.join(publicDir, 'images');
    if (fs.existsSync(imagesDir)) {
        copyDir(imagesDir, path.join(distDir, 'images'));
    }

    copyDir(path.join(publicDir, 'build'), path.join(distDir, 'build'));
}

console.log('Building static preview...');

if (!fs.existsSync(manifestPath)) {
    console.log('Running production frontend build...');
    const { execSync } = await import('node:child_process');
    execSync('npm run build', {
        cwd: root,
        stdio: 'inherit',
    });
}

if (!fs.existsSync(manifestPath)) {
    throw new Error('Missing Vite manifest. Run npm run build first.');
}

const manifest = readJson(manifestPath);
const fontsManifest = fs.existsSync(fontsManifestPath) ? readJson(fontsManifestPath) : null;

ensureDir(distDir);

const vercelDir = path.join(distDir, '.vercel');
const preservedVercel = fs.existsSync(path.join(vercelDir, 'project.json'))
    ? fs.readFileSync(path.join(vercelDir, 'project.json'), 'utf8')
    : null;

for (const page of previewPages) {
    const htmlPath = path.join(distDir, resolveOutputPath(page.url));
    if (fs.existsSync(htmlPath)) {
        fs.rmSync(htmlPath, { force: true });
    }
}

copyPublicAssets();

for (const page of previewPages) {
    const pageKey = `resources/js/pages/${page.component}.tsx`;

    if (!manifest[pageKey]) {
        throw new Error(`Missing manifest entry for ${pageKey}. Rebuild assets and try again.`);
    }

    const output = path.join(distDir, resolveOutputPath(page.url));
    ensureDir(path.dirname(output));
    fs.writeFileSync(output, buildHtml(page, manifest, fontsManifest));
    console.log(`Generated ${page.url} -> ${path.relative(root, output)}`);
}

fs.writeFileSync(
    path.join(distDir, 'vercel.json'),
    `${JSON.stringify(
        {
            $schema: 'https://openapi.vercel.sh/vercel.json',
            framework: null,
            installCommand: '',
            buildCommand: '',
            outputDirectory: '.',
            headers: [
                {
                    source: '/build/(.*)',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'public, max-age=31536000, immutable',
                        },
                    ],
                },
            ],
        },
        null,
        4,
    )}\n`,
);

fs.writeFileSync(
    path.join(distDir, 'README.txt'),
    [
        'CX Faculty static preview',
        '',
        'Deploy the dist-preview folder to Vercel (or any static host).',
        'This build is for UI review only — forms, login, and admin actions are disabled.',
        '',
        'Included pages:',
        ...previewPages.map((page) => `- ${page.url}`),
    ].join('\n'),
);

console.log(`\nStatic preview ready in ${path.relative(root, distDir)}/`);
console.log('Deploy with:');
console.log('  cd dist-preview');
console.log('  npx vercel deploy --prod --yes');
console.log('');
console.log('If the site looks blank, ensure the /build folder was uploaded (check dist-preview/build exists).');
