# CraXID Project — Website Pribadi

Website pribadi CraXID yang di-host via GitHub Pages. Isinya bukan cuma halaman link-in-bio — ada juga tool Android yang bisa dipakai langsung dari browser.

🌐 **Live:** https://craxid.github.io

## Halaman

- **`/` — Halaman utama (link-in-bio):** foto profil, nama + badge verified, status custom, tombol tautan media sosial (GitHub, WhatsApp, YouTube, X, Instagram, Facebook), status bar real-time (tanggal, jam, baterai), dark mode, dan instal sebagai PWA.
- **`/props` — Generator build.prop & Modul Magisk:** bikin `system.prop` / `module.prop` dari form, pratinjau hasilnya sebelum generate, lalu unduh sebagai ZIP siap flash. Tanggal build (buildDate, buildDateUtc, securityPatch) mengikuti waktu saat generate.
- **`404.html` — Halaman error custom** yang konsisten dengan tema situs.

## Fitur

- Dark mode otomatis + toggle manual
- Aksen hijau khas (`#2d6a4f`) yang konsisten di CSS, meta, dan manifest
- Service worker: navigasi network-first, aset stale-while-revalidate, tidak cache respons gagal
- Status bar real-time dengan info baterai (jika didukung browser)
- Ikon bahasa kartu project mengikuti bahasa repo GitHub secara dinamis

## Teknologi

- **HTML5 / CSS3 / JavaScript** murni (tanpa framework)
- **PWA:** `manifest.json` + `sw.js` (service worker)
- **Deploy:** GitHub Pages & Firebase Hosting (workflow otomatis di `.github/`)

## Cara pakai / jalanin lokal

Repo ini situs statis, tidak butuh build step:

1. Clone repo: `git clone https://github.com/craxid/craxid.github.io.git`
2. Buka `index.html` di browser, atau jalankan server lokal:
   ```bash
   npx serve .
   # atau
   python3 -m http.server 8000
   ```

## Struktur singkat

```
├── index.html      # halaman utama
├── props/          # halaman generator build.prop & Magisk
├── config.js       # konfigurasi situs (profil, tautan, dsb.)
├── script.js       # logika utama + generator props
├── style.css       # seluruh styling (termasuk dark mode)
├── sw.js           # service worker
├── manifest.json   # manifest PWA
├── 404.html        # halaman error
└── QRIS.png        # kode QRIS donasi
```

## Donasi

Kalau project ini berguna dan kamu mau mendukung, bisa scan QRIS di bawah:

![Kode QRIS Donasi](QRIS.png)

## Lisensi

MIT License — bebas pakai, ubah, dan bagikan.
