const fs = require('fs');
const path = require('path');

// Ganti dengan URL web kamu yang asli
const BASE_URL = 'https://crax.my.id'; 

const files = fs.readdirSync(__dirname);
const htmlFiles = files.filter(file => file.endsWith('.html'));

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${htmlFiles.map(file => {
    const filePath = path.join(__dirname, file);
    const stats = fs.statSync(filePath);
    const lastMod = stats.mtime.toISOString().split('T')[0];
    return `  <url>
    <loc>${BASE_URL}/${file === 'index.html' ? '' : file}</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>${file === 'index.html' ? '1.0' : '0.8'}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapContent);
console.log('✅ sitemap.xml berhasil dibuat!');
