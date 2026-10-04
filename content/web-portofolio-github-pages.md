---
title: Bikin Web Portofolio Gratis Pakai GitHub Pages, dari Nol Sampai Online dalam Sehari
date: 2026-10-02
tags: [web, github, tutorial, portofolio]
description: Panduan lengkap bikin web portofolio gratis pakai GitHub Pages — dari daftar GitHub, nulis HTML pertama, styling, sampai pasang domain sendiri. Semua dari pengalaman pribadi.
---

## Kenapa Kamu Butuh Portofolio Online

Saya mau cerita dulu. Tahun 2020, saya ngelamar kerjaan freelance web development. Portofolio saya waktu itu? Screenshot-screenshot project yang saya kirim lewat WhatsApp. File-file berantakan, kadang nggak kekirim karena kegedean, kadang burem kekompres.

Terus calon klien saya nanya satu kalimat yang nancep sampai sekarang: *"ada link web-nya nggak?"*

Nggak ada. Saya nggak punya. Malu? Banget.

Minggu depannya saya begadang tiga hari bikin web portofolio. Dan sejak punya link yang bisa dishare — satu link, rapi, kebuka di HP — respon klien berubah drastis. Bukan karena skill saya tiba-tiba naik, tapi karena saya kelihatan serius.

Itu pelajaran mahal yang saya dapat gratis: **di dunia digital, kamu dinilai dari apa yang bisa dibuka lewat link.** Nggak punya web portofolio di 2026 itu kayak ngelamar kerja tanpa bawa CV.

Kabar baiknya: bikin web portofolio itu sekarang gratis, nggak butuh hosting bayar, dan bisa selesai dalam sehari. Artikel ini panduan lengkapnya — persis kayak yang saya harapkan ada waktu saya mulai dulu.

## Kenapa GitHub Pages (dan Bukan yang Lain)

Waktu saya riset dulu, pilihannya banyak: Netlify, Vercel, Cloudflare Pages, Firebase Hosting. Semuanya bagus. Tapi buat pemula yang mau portofolio simpel, GitHub Pages menang di tiga hal:

**Gratis tanpa drama.** Nggak ada kartu kredit, nggak ada trial 14 hari, nggak ada batasan aneh. Selama akun GitHub kamu ada, web kamu online.

**Nggak butuh build tools.** Web kamu bisa murni HTML + CSS + JavaScript — upload, langsung jadi. Platform lain kadang maksa kamu pakai framework atau proses build.

**Belajar Git sekalian.** Ini bonus yang nggak ternilai. Dengan pakai GitHub Pages, kamu otomatis belajar Git — skill yang wajib di dunia kerja. Dua burung satu batu.

Kekurangannya? Cuma buat web statis — nggak bisa jalanin backend kayak PHP atau database. Tapi buat portofolio, web statis itu justru ideal: cepat, aman, dan murah (gratis).

## Langkah 1: Siapkan Akun dan Repository

Pertama, daftar di github.com kalau belum punya. Gratis.

Terus bikin repository baru dengan nama yang spesifik: `username-kamu.github.io`. Contoh, username saya `craxid`, jadi repo saya `craxid.github.io`. Nama ini spesial — GitHub otomatis mengenali repo dengan pola ini sebagai web utama dan menayangkannya di `https://username-kamu.github.io`.

Waktu bikin repo, centang "Add a README file" biar nggak kosong. Sisanya default aja.

Terus, cara upload file-nya gimana? Ada dua jalan:

**Jalan gampang (buat yang baru banget):** buka repo di browser, klik "Add file" > "Upload files", drag file HTML kamu, commit. Selesai. Nggak perlu install apa-apa.

**Jalan beneran (yang saya sarankan):** install Git di laptop, clone repo ke lokal:

```bash
git clone https://github.com/username-kamu/username-kamu.github.io.git
cd username-kamu.github.io
```

Terus kerja di situ, dan tiap selesai ngubah sesuatu:

```bash
git add .
git commit -m "Update tampilan homepage"
git push
```

Tiap kali kamu push, GitHub Pages otomatis update web kamu dalam 1-2 menit. Rasanya kayak sulap pertama kali: edit file di laptop, push, buka link — berubah. Saya masih inget perasaan itu. Nagih.

## Langkah 2: Halaman HTML Pertama

Bikin file `index.html` di folder repo. Ini kerangka paling minimal yang valid:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nama Kamu - Portofolio</title>
</head>
<body>
  <h1>Halo, saya Budi</h1>
  <p>Web developer yang suka ngoprek.</p>
</body>
</html>
```

Simpan, push, buka `https://username-kamu.github.io`. Kalau muncul tulisan "Halo, saya Budi", selamat — kamu resmi punya website. Jelek? Iya, pasti jelek. Semua web pertama jelek. Web pertama saya juga jeleknya minta ampun — background biru norak, font Times New Roman. Tapi dia online, dan itu yang penting.

Jangan terjebak perfeksionisme di tahap ini. Prinsipnya: **online dulu, bagus belakangan.** Web jelek yang online jauh lebih berguna dari web bagus yang masih di laptop.

## Langkah 3: Bikin Nggak Malu-Maluin Dilihat Orang (Styling)

Oke, sekarang bungkus biar pantes. Bikin file `style.css` di folder yang sama:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  line-height: 1.7;
  padding: 40px 20px;
  max-width: 720px;
  margin: 0 auto;
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 8px;
}

a {
  color: #52b788;
  text-decoration: none;
}
```

Terus hubungkan ke HTML dengan tambah baris ini di dalam `<head>`:

```html
<link rel="stylesheet" href="style.css">
```

Beberapa prinsip desain yang saya pelajari dengan cara keras:

**Batasi lebar konten.** Teks yang membentang selebar layar itu capek dibaca. `max-width: 720px` dengan margin auto bikin web langsung kelihatan 10x lebih profesional. Ini trik termurah dengan efek terbesar.

**Jangan pakai terlalu banyak warna.** Pilih satu warna aksen (saya pakai hijau), sisanya netral. Web pemula yang paling sering gagal itu yang warnanya kayak permen — merah, kuning, hijau, biru semua dipakai.

**Pakai font sistem.** `system-ui` itu font bawaan HP/laptop pengunjung — jadi web kamu otomatis kelihatan native di semua perangkat tanpa download font. Praktis dan cepat.

**Mobile dulu.** Buka web kamu di HP. Kalau di HP aneh, benerin dulu yang di HP. Statistiknya jelas: mayoritas pengunjung web sekarang dari HP, termasuk recruiter yang buka link kamu sambil nunggu kopi.

## Langkah 4: Kasih Nyawa dengan JavaScript

Web statis bukan berarti web mati. Sedikit JavaScript bikin web kamu terasa hidup. Contoh paling gampang dan paling berkesan: **dark mode toggle.**

Bikin file `script.js`:

```javascript
const tombol = document.getElementById('toggle-tema');

tombol.addEventListener('click', () => {
  document.body.classList.toggle('gelap');

  const gelap = document.body.classList.contains('gelap');
  localStorage.setItem('tema', gelap ? 'gelap' : 'terang');
});

// Ingat pilihan user waktu buka lagi
if (localStorage.getItem('tema') === 'gelap') {
  document.body.classList.add('gelap');
}
```

Tambah tombolnya di HTML:

```html
<button id="toggle-tema">Ganti Tema</button>
```

Dan CSS-nya:

```css
body.gelap {
  background: #020617;
  color: #f1f5f9;
}
```

Sederhana, tapi efeknya: pengunjung bisa ganti tema, pilihannya diingat. Itu udah termasuk "interaktif" dan bikin web kamu terasa modern. Dari sini kamu bisa lanjut ke hal-hal kayak animasi scroll, filter project, atau form kontak.

## Langkah 5: Struktur Portofolio yang Beneran Menjual

Web online, tampilan rapi, ada dark mode. Sekarang isinya. Ini struktur yang saya pakai dan terbukti works:

**1. Headline yang jelas.** Bukan "selamat datang di website saya" — itu buang-buang piksel paling berharga di web kamu. Tulis siapa kamu dan apa yang kamu lakukan dalam satu kalimat: *"Budi — Web Developer yang bikin web cepat dan rapi."* Pengunjung memutuskan dalam 3 detik apakah mereka lanjut scroll atau tutup tab. Manfaatkan 3 detik itu.

**2. Project, bukan daftar skill.** Recruiter dan klien nggak peduli kamu "menguasai 15 bahasa pemrograman". Mereka peduli: apa yang pernah kamu bikin? Tampilkan 3-6 project terbaik, masing-masing dengan: nama, deskripsi satu-dua kalimat, screenshot atau link demo, dan link ke kode sumbernya. Satu project nyata mengalahkan sepuluh baris daftar skill.

**3. Tentang singkat.** Dua-tiga paragraf: siapa kamu, fokusmu apa, lagi cari apa (kerja full-time? freelance? kolaborasi?). Manusiawi, jangan kayak CV kaku.

**4. Kontak yang gampang.** Jangan sembunyikan cara menghubungimu di halaman ke-5. Taruh yang jelas: email, atau link WhatsApp/Telegram. Tiap klik tambahan yang dibutuhkan buat menghubungimu = sekian persen klien potensial yang kabur.

**5. Blog (opsional tapi powerful).** Ini yang bikin portofolio kamu hidup jangka panjang. Nulis tutorial kayak yang kamu baca sekarang ini nunjukin dua hal sekaligus: kamu ngerti topiknya, dan kamu bisa komunikasi. Dua-duanya nilai jual. Saya nulis blog di web ini juga awalnya iseng — ternyata beberapa klien justru datang dari artikel, bukan dari halaman project.

## Langkah 6: Pasang Domain Sendiri Biar Kelihatan Serius

`username.github.io` itu oke buat mulai, tapi `namakamu.com` itu beda kelas. Kabar baik: GitHub Pages dukung custom domain gratis. Yang bayar cuma domainnya sendiri.

Langkahnya:

1. **Beli/daftar domain.** Bisa yang berbayar (.com sekitar 150 ribu/tahun) atau gratis (kayak .eu.org). Pilih yang kamu yakin bisa perpanjang — domain mati = web hilang.
2. **Atur DNS.** Di panel domain kamu, tambah CNAME record yang mengarah ke `username-kamu.github.io`. Tunggu beberapa menit sampai propagasi.
3. **Bikin file `CNAME`** (tanpa ekstensi) di root repo, isinya cuma satu baris: nama domain kamu. Contoh: `www.namakamu.com`.
4. **Aktifkan HTTPS.** Di Settings > Pages repo GitHub kamu, centang "Enforce HTTPS". Tunggu sertifikatnya jadi (bisa sampai 24 jam, biasanya sih sejam).

Selesai. Sekarang web kamu bisa dibuka lewat domain sendiri dengan gembok hijau. Kelihatan profesional, padahal hostingnya tetap gratis.

Satu peringatan: **jangan gonta-ganti domain.** Tiap ganti domain, kamu mulai dari nol lagi di mata Google. Pilih satu, komit, rawat jangka panjang.

## Langkah 7: Workflow Update yang Nggak Bikin Malas

Web portofolio yang mati (terakhir update 2021) itu lebih buruk dari nggak punya web. Biar rajin update, bikin workflow-nya gampang:

- **Edit lokal, preview di browser**, puas baru push. Jangan edit langsung di website GitHub kecuali darurat — nggak ada undo yang enak.
- **Commit message yang jelas.** Bukan "update" doang, tapi "tambah project X" atau "perbaiki typo di about". Nanti kamu berterima kasih waktu mau lacak perubahan.
- **Jadwal ringan:** target realistis, misalnya satu perbaikan kecil per minggu atau satu artikel per bulan. Konsisten ngalahin ambisius tapi cuma seminggu.

Saya sendiri pakai pola ini bertahun-tahun. Kuncinya bukan disiplin baja — tapi bikin prosesnya segampang mungkin sampai malas pun tetap jalan.

## Tips Biar Portofoliomu Dililrik (yang Jarang Dibahas)

Terakhir, beberapa hal yang saya pelajari dari sisi "penilai", bukan cuma "pembuat":

**Kecepatan itu fitur.** Web yang loading 5 detik bikin orang kabur sebelum lihat isinya. Web statis GitHub Pages itu udah cepat secara bawaan — jangan dirusak dengan gambar 5MB atau library segambreng. Kompres gambarmu sebelum upload.

**Bahasa Indonesia itu nilai plus, bukan minus.** Banyak yang maksa nulis portofolio full bahasa Inggris padahal targetnya klien lokal. Kalau targetmu Indonesia, tulis Indonesia yang rapi. Keaslian mengalahkan kesan internasional yang dipaksakan.

**Tunjukkan proses, bukan cuma hasil.** Satu paragraf "kenapa saya bikin project ini dan apa masalahnya" jauh lebih meyakinkan dari sekadar screenshot. Itu yang membedakan portofolio dari galeri.

**Sertakan hal yang gagal.** Serius. Satu project yang kamu ceritakan kegagalannya dengan jujur ("saya coba X, ternyata Y, pelajarannya Z") itu nunjukin kedewasaan yang nggak bisa dipalsukan. Pewawancara suka ini.

---

Udah, itu panduan lengkap dari nol sampai online. Kalau kamu ikuti langkah per langkah, besok jam segini kamu udah punya web portofolio yang bisa dishare ke siapa pun.

Dan kalau butuh contoh nyata, web yang lagi kamu baca ini — ya, web ini — jalan di GitHub Pages (plus Firebase). Semua teknik di artikel ini dipakai di sini. Jadi ini bukan teori doang.

Selamat bikin web!

## Biar Ketemu di Google: SEO Dasar yang Cukup

Punya web tapi nggak ketemu di Google itu kayak punya toko di gang buntu. Untungnya SEO dasar buat web statis itu gampang — nggak perlu jadi ahli.

**Judul tiap halaman harus beda dan jelas.** `<title>` itu hal pertama yang Google baca. "Home" itu judul yang buruk. "Budi Santoso - Web Developer Jakarta" itu judul yang bagus. Setiap halaman web kamu harus punya judul unik yang deskriptif.

**Meta description.** Baris `<meta name="description" content="...">` itu yang muncul sebagai cuplikan di hasil pencarian. Tulis 1-2 kalimat yang bikin orang pengen klik. Ini nggak ngaruh ke ranking, tapi ngaruh ke jumlah yang klik — dan itu sama pentingnya.

**Satu H1 per halaman.** H1 itu judul utama. Jangan ada dua. Terus H2 buat sub-bagian, H3 buat sub-sub-bagian. Struktur heading yang rapi ngebantu Google ngerti hierarki kontenmu.

**Alt text di gambar.** Setiap `<img>` kasih `alt` yang deskriptif: `alt="Screenshot aplikasi kasir yang saya buat"`, bukan `alt="gambar1"`. Selain buat SEO, ini juga buat aksesibilitas — pembaca layar butuh ini.

**Sitemap.** Bikin file `sitemap.xml` yang daftarin semua halamanmu, terus daftarin web ke Google Search Console. Gratis, dan dari situ kamu bisa lihat web kamu udah ke-index atau belum, ada error apa, dan kata kunci apa yang bawa pengunjung.

Jujur aja: buat web portofolio pribadi, lima hal di atas udah lebih dari cukup. Nggak perlu pusingin schema markup atau core web vitals sampai obsesif — kecuali kamu emang mau jadi konsultan SEO.

## Pasang Analitik Biar Tahu Ada yang Baca

Web tanpa analitik itu kayak toko tanpa kasir yang ngitung pengunjung — kamu nggak tahu ada yang datang atau nggak. Untungnya ada yang gratis dan gampang: **Cloudflare Web Analytics** atau **Umami**. Keduanya ringan dan nggak butuh cookie banner ribet kayak Google Analytics.

Yang perlu kamu perhatikan cuma tiga angka:

1. **Pengunjung per hari/minggu.** Naik, turun, atau datar? Ini indikator paling jujur apakah web kamu berkembang.
2. **Halaman paling populer.** Kalau artikel tutorialmu yang paling banyak dibaca, itu sinyal: nulis lagi yang sejenis.
3. **Sumber traffic.** Dari Google? Dari link yang kamu share? Dari mana orang nemu kamu?

Saya pernah kaget waktu lihat analitik web saya: artikel yang saya tulis asal-asalan dalam sejam ternyata dibaca 10x lipat dari artikel yang saya riset seminggu. Data nggak pernah bohong — dan dia ngajarin saya nulis yang pembaca mau, bukan yang saya kira mereka mau.

## Studi Kasus: Web Ini Sendiri

Biar adil, saya bedah web yang lagi kamu baca ini — apa yang saya lakukan benar, dan apa yang masih PR:

**Yang udah bener:**
- Hosting gratis (GitHub Pages + Firebase), custom domain, HTTPS aktif.
- Mobile-friendly — mayoritas pengunjung dari HP.
- Struktur jelas: homepage, blog, halaman tool, halaman kontak/tentang/privasi.
- Blog pakai Markdown — nulis artikel jadi gampang, nggak perlu ngoding tiap kali mau posting.

**Yang masih PR (saya jujur aja):**
- Artikel blog di-render pakai JavaScript dari file Markdown. Buat pengunjung nggak masalah, tapi buat mesin pencari ini kurang ideal dibanding HTML statis murni. Ini PR teknis yang lagi saya pikirkan solusinya.
- Beberapa artikel masih pendek. Target saya 1000+ kata per artikel — yang kamu baca ini salah satu yang memenuhi target.
- Belum ada newsletter atau cara buat pengunjung balik lagi. Orang baca, pergi, lupa. Itu masalah yang belum saya selesaikan.

Saya ceritain PR-nya juga biar kamu tahu: web yang bagus itu nggak pernah "selesai". Selalu ada yang bisa diperbaiki. Yang penting jalan dulu.

## Troubleshooting: Masalah yang Pasti Kamu Temui

**"Web saya 404 padahal file udah di-push."**
Tunggu 2-3 menit — GitHub Pages butuh waktu deploy. Kalau masih 404 setelah 10 menit, cek: nama file-nya bener `index.html` (huruf kecil semua)? Ada di root repo atau branch yang benar? Repo-nya public?

**"Custom domain nggak jalan."**
Urutannya: (1) DNS udah propagasi belum? Cek pakai situs kayak dnschecker.org. (2) File CNAME isinya bener? (3) Di Settings > Pages, custom domain-nya keisi? (4) Enforce HTTPS dicentang? 90% masalah domain itu masalah DNS yang belum propagasi — tunggunya bisa sampai 24 jam, walau biasanya sejam.

**"Tampilan di HP berantakan."**
Hampir pasti karena lupa `<meta name="viewport">` di head. Tanpa itu, HP bakal nampilin web versi desktop yang dikecilin. Satu baris itu nyelamatin semuanya:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**"Gambar nggak muncul."**
Cek path-nya. Ini kesalahan klasik: di laptop path-nya `C:\Users\...` (nggak bakal jalan di web), atau salah huruf besar-kecil (`Foto.jpg` vs `foto.jpg` — di server Linux itu dua file beda). Selalu pakai path relatif dan huruf kecil konsisten.

## FAQ

**Q: Perlu bisa desain grafis?**
A: Nggak. Desain web portofolio yang bagus itu 90% soal kerapian (spacing, tipografi, warna konsisten), 10% soal bakat seni. Ikuti prinsip yang saya tulis di bagian styling, hasilnya udah di atas rata-rata.

**Q: GitHub Pages vs beli hosting, mana yang lebih baik?**
A: Buat portofolio statis: GitHub Pages menang telak (gratis, cepat, aman). Beli hosting baru masuk akal kalau kamu butuh backend (PHP, database) atau mau pakai WordPress.

**Q: Berapa lama dari nol sampai online?**
A: Kalau fokus, 4-6 jam buat versi pertama yang rapi. Saya bilang "sehari" di judul biar santai — termasuk istirahat ngopi dan bingung milih warna.

**Q: Apakah portofolio harus pakai bahasa Inggris?**
A: Tergantung target. Klien lokal Indonesia? Bahasa Indonesia rapi udah cukup, malah lebih personal. Target remote/internasional? Ya, Inggris. Yang penting jangan campur aduk nggak jelas.

**Q: Gimana kalau saya nggak punya project buat dipajang?**
A: Bikin. Serius. Project dummy yang kamu bikin buat belajar itu tetap project. Web portofolio ini sendiri bisa jadi project pertamamu — tulis di portofoliomu: "Web portofolio ini saya bikin sendiri pakai HTML/CSS/JS, di-host gratis di GitHub Pages." Itu udah nunjukin inisiatif.

---

Oke, segitu dulu. Tiga ribu kata buat bilang satu hal sederhana: **bikin web portofolio itu gampang, gratis, dan dampaknya gede.** Penghalang terbesar bukan teknis — tapi rasa "nanti aja" yang nggak pernah selesai.

Jadi, nanti aja atau sekarang?

## Rencana 7 Hari: Dari Nol Sampai Punya Link

Biar artikel ini nggak cuma jadi bacaan, saya kasih rencana konkret. Satu minggu, 30-60 menit sehari:

**Hari 1 — Fondasi.** Daftar GitHub, bikin repo `username.github.io`, upload `index.html` paling sederhana. Target hari ini cuma satu: web kamu online, walau jelek.

**Hari 2 — Styling.** Bikin `style.css`, atur warna, font, dan lebar konten. Buka di HP, benerin yang aneh. Target: web yang nggak malu-maluin dibuka orang.

**Hari 3 — Isi.** Tulis headline, daftar 3 project (walau project belajar), bagian tentang, dan kontak. Ini hari paling berat secara mental — nulis tentang diri sendiri itu susah. Lewati aja, tulis apa adanya.

**Hari 4 — Interaksi.** Tambah `script.js`: dark mode toggle, tahun otomatis di footer, efek kecil lain kalau mau. Target: web terasa hidup.

**Hari 5 — Domain.** Daftar domain, atur DNS, bikin file CNAME, aktifkan HTTPS. Sambil nunggu propagasi, baca-baca soal SEO dasar di atas.

**Hari 6 — SEO & analitik.** Benerin title tiap halaman, tambah meta description, bikin sitemap.xml, daftar ke Google Search Console, pasang analitik ringan.

**Hari 7 — Share.** Kirim link ke 5 orang dan minta pendapat jujur. Post di media sosial. Tulis satu artikel blog pertama — tentang proses bikin web ini. Meta, tapi efektif.

Tujuh hari. Satu jam sehari. Dan kamu punya aset digital yang kerja buat kamu 24 jam sehari, bahkan waktu kamu tidur.

Saya nggak akan bilang ini gampang — hari ke-3 itu beneran berat, nulis tentang diri sendiri memang nggak enak. Tapi saya juga nggak akan bilang ini susah — karena ribuan orang dengan skill pas-pasan (termasuk saya dulu) udah buktiin bisa.

Bedanya orang yang punya portofolio dan yang nggak itu cuma satu: yang satu mulai, yang satu nunda. Kamu mau jadi yang mana?
