/* service worker khusus /musik/ — scope-nya cuma /musik/ aja.
   root sw.js (/) nggak ikut campur di sini, biar cache musik kepisah rapi. */

const CACHE_NAME = "craxid-musik-v1";

const STATIC_ASSETS = [
  "/musik/",
  "/musik/index.html",
  "/musik/style.css",
  "/musik/script.js",
  "/musik/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
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

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  /* API audio & lirik: selalu fresh, jangan di-cache.
     respons gagal yg ke-cache bikin lagu macet walau koneksi udah pulih. */
  const isLiveApi =
    url.hostname === "yt.hxa.my.id" ||
    url.hostname === "lrclib.net" ||
    url.pathname.startsWith("/api/yt-audio");
  if (isLiveApi) {
    event.respondWith(fetch(request));
    return;
  }

  /* navigasi: network-first biar update selalu sampe,
     fallback ke cache, terus 404 kalo offline. */
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/musik/index.html")))
    );
    return;
  }

  /* aset lain: stale-while-revalidate, sajikan cache biar cepet,
     update di belakang biar perubahan selalu sampe. */
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const networkFetch = fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);
      return cachedResponse || networkFetch;
    })
  );
});
