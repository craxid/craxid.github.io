const CACHE_NAME = 'v1';

// Kita tes tanpa cache file dulu agar SW pasti jalan
self.addEventListener('install', (e) => {
    console.log('SW Installed');
});

self.addEventListener('fetch', (e) => {
    // Biarkan request lewat tanpa cache dulu buat testing
    e.respondWith(fetch(e.request));
});
