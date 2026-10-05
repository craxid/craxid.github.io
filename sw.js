const CACHE_NAME = "craxid-project-v11";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/bot/",
  "/bot/index.html",
  "/blog/",
  "/blog/index.html",
  "/post.html",
  "/blog/cara-buat-website-shortlink/",
  "/blog/monetisasi-youtube-short/",
  "/blog/cara-ubah-tema-gboard/",
  "/blog/panduan-build-prop-dari-nol/",
  "/blog/bikin-bot-whatsapp-dari-nol/",
  "/blog/web-portofolio-github-pages/",
  "/content/index.json",
  "/about/",
  "/about/index.html",
  "/contact/",
  "/contact/index.html",
  "/privacy/",
  "/privacy/index.html",
  "/panel/",
  "/panel/index.html",
  "/404.html",
  "/config.js",
  "/style.css",
  "/script.js",
  "/manifest.webmanifest",
  "/icons/icon-256.webp",
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

  // API GitHub: selalu fresh, jangan baca/tulis cache.
  // respons gagal (mis. rate limit) yg ke-cache bikin daftar
  // project "nempel" rusak walau koneksi udah pulih.
  const isLiveApi = url.hostname === "api.github.com";

  if (isLiveApi) {
    event.respondWith(fetch(request));
    return;
  }

  // navigasi: network-first biar update HTML selalu sampe,
  // fallback ke cache, terus 404 kalo offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match("/404.html"))
        )
    );
    return;
  }

  // aset lain (CSS/JS/font): stale-while-revalidate.
  // sajikan cache langsung biar cepet, update cache di belakang
  // biar perubahan file selalu sampe tanpa bump versi manual.
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const networkFetch = fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || networkFetch;
    })
  );
});
