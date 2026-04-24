const CACHE_NAME = 'dede-k-porto-v1';
const assets = [
  './',
  'index.html',
  'style.css',
  'script.js',
  'icons/icon.webp'
];

// Install Service Worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

// Fetch Assets
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(rec => {
      return rec || fetch(evt.request);
    })
  );
});
