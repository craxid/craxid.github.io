const CACHE_NAME = "craxid-project-v2";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/bot/",
  "/bot/index.html",
  "/404.html",
  "/config.js",
  "/style.css",
  "/script.js",
  "/manifest.webmanifest",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // API GitHub: selalu ambil fresh, jangan pernah baca/tulis cache.
  // Respons gagal (mis. rate limit) yang ter-cache bikin daftar
  // project "nempel" rusak walau koneksi sudah pulih.
  const isLiveApi = url.hostname === "api.github.com";

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse && !isLiveApi) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          // Hanya cache respons yang sukses, dan bukan API live
          if (networkResponse.ok && !isLiveApi) {
            const responseClone = networkResponse.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }

          return networkResponse;
        })
        .catch(() => {
          if (request.mode === "navigate") {
            return caches.match("/404.html");
          }
        });
    })
  );
});
