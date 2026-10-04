---
title: Bikin Shortlink Sendiri
date: 2026-10-05
tags: [web, shortlink, tutorial]
description: Capek share link panjang yang berantakan di grup WhatsApp? Ini panduan lengkap bikin shortlink sendiri — dari layanan gratis sampai self-host — biar link kamu pendek, rapi, dan kelihatan profesional.
---

## Link Panjang Itu Musuh Kerapian

Ceritanya begini. Waktu itu saya lagi bantu panitia acara kampus nyebar formulir pendaftaran. Link Google Form-nya, ya ampun, panjangnya minta ampun — campuran huruf, angka, strip, underscore, pokoknya kalau di-copy ke grup WhatsApp dia makan tiga baris sendiri. Terus ada anggota panitia yang ngetik ulang manual karena HP-nya nggak bisa tap link-nya (entah kenapa), dan tentu saja salah ketik. Formulir nggak kekirim, dia panik, saya yang disalahin. Padahal masalahnya cuma satu: link-nya jelek.

Kejadian kedua, saya share link Google Drive berisi materi ke grup kelas. Link-nya panjang, terus ada yang forward ke grup lain, terus ada yang forward lagi. Di forward ketiga, link-nya kepotong sama WhatsApp. Jadilah link mati. Saya harus upload ulang, bikin link baru, share ulang. Buang-buang waktu cuma gara-gara link kepanjangan.

Sejak itu saya bersumpah: nggak akan pernah lagi share link mentah yang panjangnya kayak kereta api. Solusinya ternyata gampang banget dan — ini yang bikin saya nyesel kenapa nggak dari dulu — bisa gratis. Namanya shortlink: link pendek buatan sendiri yang kalau diklik langsung ngarah ke link panjang aslinya.

Kamu pasti udah familiar sama bit.ly atau s.id. Tapi artikel ini bukan tentang cara pakai bit.ly — itu sih tinggal daftar, tempel link, jadi. Artikel ini tentang bikin shortlink **milik kamu sendiri**: domain kamu, aturan kamu, data kamu. Dan percayalah, begitu kamu punya shortlink sendiri, kamu bakal heran kenapa dulu betah pakai link panjang.

## Kenapa Repot-Repot Bikin Sendiri? Kan Ada bit.ly

Pertanyaan bagus, dan saya sempat mikir gitu juga. Buat apa ribet, kan tinggal buka bit.ly, tempel, beres. Jawaban saya berubah total setelah ngalamin beberapa hal ini.

Pertama, **branding**. Coba bandingin: `bit.ly/3xY9zQa` vs `s.id/namamu` vs `go.namadomainkamu.id/daftar`. Yang terakhir itu kelihatan kayak orang beneran, kan? Waktu saya share link `craxid.github.io` versi pendeknya sendiri ke klien, responnya beda. Orang lebih berani klik link yang domainnya jelas dibanding link pendek generik yang — maaf — sering dipakai buat phishing. Link pendek anonim itu sekarang dicurigai orang. Link pendek dengan nama kamu sendiri justru menaikkan kepercayaan.

Kedua, **kontrol penuh**. Layanan gratisan itu bisa berubah aturan kapan aja. Hari ini gratis unlimited, besok tiba-tiba dibatasi 10 link per bulan kecuali bayar. Atau lebih parah: layanannya tutup, dan semua link pendek kamu mati bareng. Kalau shortlink-nya punya kamu sendiri — file-nya di hosting kamu, domainnya punya kamu — nggak ada yang bisa matiin sepihak. Link yang kamu sebar tahun lalu tetap jalan tahun depan. Buat saya yang suka share link materi dan portofolio ke banyak orang, ketenangan ini mahal harganya.

Ketiga, **tanpa iklan dan tanpa pelacakan orang lain**. Banyak layanan shortlink gratisan nyelipin halaman iklan interstitial — klik link, disuruh nunggu 5 detik nonton iklan, baru diterusin. Menyebalkan, dan bikin kamu kelihatan nggak profesional. Belum lagi datanya: setiap klik dicatat sama mereka buat kepentingan mereka. Punya sendiri? Nggak ada iklan, dan data klik — kalau kamu mau nyatet — ya milik kamu.

Keempat, dan ini favorit saya: **gratis selamanya**. Sekali setup, nggak ada biaya bulanan. Domain .id atau .my.id itu murah (ada yang belasan ribu per tahun), hosting bisa pakai yang gratisan. Bandingkan sama paket premium bit.ly yang harganya bikin dompet nangis per bulan. Buat pelajar, freelancer, atau panitia acara kampus kayak saya dulu, selisihnya berasa banget.

Tapi saya juga jujur: bikin sendiri butuh usaha di awal, mungkin satu-dua jam. Kalau kamu cuma butuh memperpendek satu link sekali seumur hidup, ya pakai aja s.id, nggak usah baca artikel ini. Tapi kalau kamu sering share link — buat jualan, buat komunitas, buat kerjaan — investasi dua jam ini bakal balik berkali-kali lipat.

## Opsi A: Pakai Layanan Gratis (Jalan Pintas)

Oke, sebelum masuk ke yang agak teknis, saya kasih jalan pintas dulu. Kalau kamu mau hasil cepat hari ini juga tanpa utak-atik server, pakai layanan shortlink gratis.

Yang paling saya rekomendasikan buat orang Indonesia: **s.id**. Ini buatan Indonesia (dikelola Pandi, pengelola domain .id), gratis, nggak ada iklan interstitial, dan — ini penting — kamu bisa bikin link dengan nama custom, bukan cuma kode acak. Jadi `s.id/formulir-daftar` itu bisa, asal belum dipakai orang lain. Caranya gampang banget:

1. Buka s.id, daftar pakai email.
2. Klik bikin link baru, tempel URL panjang kamu.
3. Ganti slug-nya (bagian belakang) sesukamu, misal `s.id/materi-kelas-12`.
4. Simpan, beres. Link langsung bisa dipakai.

Kelebihannya jelas: lima menit jadi, nggak perlu mikir server. Kekurangannya ya itu tadi — domainnya bukan milikmu, aturannya ikut mereka, dan kalau suatu hari mereka berubah kebijakan, kamu ikut kena. Buat kebutuhan sekali-sekali atau darurat ("link formulir harus disebar 10 menit lagi!"), opsi ini penyelamat. Saya sendiri masih pakai s.id buat link-link iseng yang nggak penting-penting amat.

Tapi kalau kamu baca artikel ini sampai sini, saya tebak kamu mau yang lebih serius. Lanjut.

## Opsi B: Self-Host di Hosting Sendiri (PHP, 15 Menit Jadi)

Ini opsi favorit saya buat yang udah punya shared hosting (atau VPS). Idenya sederhana: bikin satu file PHP yang nerima slug dari URL, nyocokin ke daftar link, terus redirect. Nggak perlu database, nggak perlu framework. Saya pernah setup ini di hosting murah waktu lagi iseng, dan total waktunya nggak sampai 15 menit termasuk beli kopi.

Pertama, bikin file `.htaccess` di folder shortlink kamu biar semua request diarahkan ke satu file PHP:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([a-zA-Z0-9-_]+)/?$ index.php?slug=$1 [L,QSA]
```

Artinya: kalau ada yang buka `domainkamu.id/daftar`, server diam-diam manggil `index.php?slug=daftar`. Pengunjung nggak sadar apa-apa, URL di address bar tetap pendek dan rapi.

Terus bikin `index.php`-nya:

```php
<?php
// Daftar shortlink: slug => URL tujuan
// Tambah/edit/hapus baris di sini aja kalau mau ubah link
$links = [
    "daftar"  => "https://docs.google.com/forms/d/e/contoh-formulir-panjang-sekali-di-sini/viewform",
    "materi"  => "https://drive.google.com/drive/folders/contoh-folder-materi-yang-panjang",
    "wa"      => "https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik",
    "portofolio" => "https://namakamu.github.io",
];

$slug = $_GET["slug"] ?? "";

if (isset($links[$slug])) {
    // 302 = redirect sementara; ganti jadi 301 kalau link-nya permanen
    header("Location: " . $links[$slug], true, 302);
    exit;
}

// Kalau slug nggak dikenal, tampilin halaman 404 yang sopan
http_response_code(404);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Link tidak ditemukan</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 60px 20px; }
        h1 { font-size: 22px; }
        a { color: #2d6a4f; }
    </style>
</head>
<body>
    <h1>Yah, link-nya nggak ketemu 😅</h1>
    <p>Mungkin salah ketik, atau link-nya udah dihapus.</p>
    <p><a href="/">Kembali ke beranda</a></p>
</body>
</html>
```

Upload dua file itu ke hosting, dan jadi. `domainkamu.id/daftar` langsung mental ke Google Form yang panjangnya sejuta karakter itu. Mau nambah link baru? Tinggal edit satu baris di array `$links`, upload ulang. Nggak perlu buka dashboard, nggak perlu login ke mana-mana.

Beberapa catatan dari pengalaman saya. Pertama, soal 301 vs 302: kalau link tujuannya permanen (misal link portofolio yang nggak bakal ganti), pakai 301 biar browser nge-cache redirect-nya — loading jadi sedikit lebih cepat buat pengunjung yang balik lagi. Kalau link-nya bisa ganti-ganti (misal formulir tiap semester beda), pakai 302. Di contoh di atas saya pakai 302 biar aman.

Kedua, amankan sedikit: file ini cuma baca array, nggak nerima input berbahaya selain slug yang dicocokkan persis ke daftar. Jadi relatif aman. Tapi jangan taruh file ini di folder yang sama dengan aplikasi penting lain tanpa proteksi — praktik umumnya sih dipisah, misal subdomain khusus kayak `go.domainkamu.id`.

Ketiga, kalau hosting kamu nggak support `.htaccess` (misal hosting berbasis Nginx), caranya beda dikit — kamu perlu setting rewrite rule di konfigurasi Nginx. Tanya aja ke CS hosting-nya, biasanya mereka bantuin.

Kekurangan opsi ini: kamu butuh hosting PHP (hampir semua shared hosting murah udah termasuk) dan tiap nambah link harus edit file manual. Buat puluhan link sih masih oke. Kalau link-nya ratusan dan sering ganti, kamu butuh database + halaman admin — tapi itu udah level lanjut, di luar cakupan artikel ini.

## Opsi C: Trik GitHub Pages (Gratis, Tanpa Server Sama Sekali)

Nah, ini trik yang paling saya suka karena biayanya NOL rupiah dan nggak butuh server PHP. GitHub Pages itu hosting statis gratis — nggak bisa jalanin PHP, tapi bisa jalanin JavaScript. Jadi redirect-nya kita lakukan di sisi browser pakai JS.

Idenya: satu file `links.json` berisi daftar slug dan URL tujuan, plus satu file `index.html` yang baca slug dari URL, cari di `links.json`, terus redirect pakai `window.location`.

Pertama, `links.json` di root repo:

```json
{
  "daftar": "https://docs.google.com/forms/d/e/contoh-formulir-panjang-sekali-di-sini/viewform",
  "materi": "https://drive.google.com/drive/folders/contoh-folder-materi-yang-panjang",
  "wa": "https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik",
  "portofolio": "https://namakamu.github.io",
  "blog": "https://namakamu.github.io/blog/"
}
```

Terus `index.html`-nya. Triknya: GitHub Pages nggak bisa rewrite path sembarangan kayak `.htaccess`, jadi kita pakai pola hash atau query. Cara paling gampang yang selalu jalan: `domainkamu.id/?daftar` atau `domainkamu.id/#daftar`. Tapi itu kurang cantik. Alternatif yang lebih rapi: pakai fitur 404.html-nya GitHub Pages — semua path yang nggak ada file-nya akan dilayani oleh `404.html`. Jadi kita bikin `404.html` yang berfungsi sebagai redirector!

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Mengalihkan...</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 60px 20px; }
    </style>
</head>
<body>
    <p>Mengalihkan, sebentar ya...</p>
    <script>
        (async function () {
            // Ambil slug dari path, misal /daftar -> "daftar"
            var slug = window.location.pathname
                .replace(/^\//, "")
                .replace(/\/$/, "")
                .split("/")[0];

            if (!slug) {
                // Kalau buka domain polos tanpa slug, tampilkan daftar link
                document.body.innerHTML =
                    "<h1>Shortlink saya</h1><p>Klik salah satu:</p><ul id='list'></ul>" +
                    "<script>fetch('links.json').then(r=>r.json()).then(d=>{" +
                    "var ul=document.getElementById('list');" +
                    "Object.keys(d).forEach(function(k){" +
                    "var li=document.createElement('li');" +
                    "var a=document.createElement('a');" +
                    "a.href='/'+k; a.textContent='/'+k;" +
                    "li.appendChild(a); ul.appendChild(li);});" +
                    "})<\/script>";
                return;
            }

            try {
                var res = await fetch("/links.json");
                var links = await res.json();
                if (links[slug]) {
                    window.location.replace(links[slug]);
                } else {
                    document.body.innerHTML =
                        "<h1>Link tidak ditemukan 😅</h1>" +
                        "<p>Slug <b>" + slug + "</b> belum terdaftar.</p>";
                }
            } catch (e) {
                document.body.innerHTML =
                    "<h1>Duh, error.</h1><p>Coba refresh halamannya.</p>";
            }
        })();
    </script>
</body>
</html>
```

Hmm, tunggu — kode di atas buat halaman daftar link-nya agak ribet karena saya paksa nulis pakai string. Biar lebih bersih, sebenarnya mending bikin `index.html` terpisah buat halaman utama yang nampilin daftar link dengan rapi, dan `404.html` khusus buat redirect. Saya sederhanakan: `404.html` cuma urus redirect, titik.

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Mengalihkan...</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 60px 20px; color: #333; }
    </style>
</head>
<body>
    <p>Mengalihkan, sebentar ya...</p>
    <script>
        (async function () {
            var slug = window.location.pathname
                .replace(/^\//, "")
                .replace(/\/$/, "")
                .split("/")[0]
                .toLowerCase();

            try {
                var res = await fetch("/links.json");
                var links = await res.json();
                var target = links[slug];
                if (target) {
                    window.location.replace(target);
                } else {
                    document.body.innerHTML =
                        "<h1>Link tidak ditemukan 😅</h1>" +
                        "<p>Slug <b>" + slug.replace(/</g, "&lt;") + "</b> belum terdaftar.</p>" +
                        "<p><a href='/'>Kembali ke beranda</a></p>";
                }
            } catch (e) {
                document.body.innerHTML =
                    "<h1>Duh, error.</h1><p>Coba refresh halamannya.</p>";
            }
        })();
    </script>
</body>
</html>
```

Push dua file itu (`links.json` + `404.html`) ke repo GitHub Pages kamu, dan `username.github.io/daftar` langsung redirect ke tujuan. Mau nambah link? Edit `links.json`, commit, push. Beres dalam satu menit.

Jujur ya, trik ini ada komprominya. Redirect-nya terjadi di browser, jadi ada jeda sepersekian detik ("Mengalihkan, sebentar ya...") sebelum nyampe tujuan — nggak se-instan redirect server kayak opsi PHP. Terus daftar link-nya kebuka publik di `links.json`, jadi jangan taruh link rahasia di sini (ya kali ada link rahasia di shortlink, tapi tetap saya ingetin). Dan karena mengandalkan halaman 404, kalau ada yang buka path ngawur, dia juga masuk ke logika ini — makanya saya kasih pesan "tidak ditemukan" yang sopan.

Tapi buat gratisan? Ini luar biasa. Saya sendiri pakai pola ini buat beberapa link, dan nggak pernah ada komplain. Buat kamu yang udah punya GitHub Pages (misal buat portofolio), ini cara termurah nambah shortlink: nol rupiah, nol server, cuma dua file.

Oh iya, satu tips: kalau kamu pakai custom domain di GitHub Pages (misal `go.namadomainkamu.id`), shortlink-nya jadi makin cakep. Caranya sama kayak pasang domain biasa di GitHub Pages — nanti saya bahas di bagian domain.

## Pasang Domain Sendiri Biar Makin Gagah

Mau shortlink-nya pakai domain sendiri kayak `go.namakamu.id` atau `s.namakamu.my.id`? Ini bagian yang dulu bikin saya keringetan, ternyata setelah paham polanya, gampang.

Langkah umumnya begini, apapun hosting yang kamu pakai:

1. **Beli domain.** Buat shortlink, nggak perlu domain mahal. Domain `.my.id` itu murah banget (belasan ribu per tahun), `.id` sedikit lebih mahal tapi lebih keren. Beli di registrar mana aja yang kamu percaya.

2. **Buat subdomain khusus**, misal `go.namakamu.id`. Kenapa subdomain, bukan domain utama? Biar rapi aja — domain utama buat web portofolio/blog kamu, subdomain `go.` khusus buat shortlink. Di panel DNS domain kamu, tambahkan record:
   - Kalau pakai shared hosting: record `A` untuk `go` yang mengarah ke IP hosting kamu.
   - Kalau pakai GitHub Pages: record `CNAME` untuk `go` yang mengarah ke `username.github.io`.
   - Kalau pakai VPS: record `A` ke IP VPS.

3. **Tunggu propagasi DNS.** Ini bagian yang ngeselin — bisa 5 menit, bisa 4 jam. Dulu saya bolak-balik cek tiap 10 menit kayak orang gelisah. Saran saya: tinggalin aja, kerjain yang lain, nanti juga ijo sendiri.

4. **Pasang SSL (HTTPS).** Jangan sampai shortlink kamu HTTP doang — browser modern bakal kasih peringatan "not secure" yang bikin orang takut klik. Di shared hosting biasanya ada AutoSSL gratis tinggal klik. Di GitHub Pages, centang "Enforce HTTPS" di settings (muncul setelah DNS-nya kebaca). Di VPS, pakai Certbot, gratis juga.

5. **Arahkan ke folder/file shortlink kamu.** Di shared hosting, bikin subdomain `go` yang document root-nya ke folder berisi `index.php` tadi. Di GitHub Pages, tambah file `CNAME` berisi `go.namakamu.id` di repo shortlink kamu (bikin repo terpisah dari repo portofolio biar nggak campur).

Udah. Sekarang `go.namakamu.id/daftar` adalah shortlink resmi milikmu. Rasanya... puas banget. Kayak punya stempel sendiri.

Satu peringatan dari pengalaman pahit teman saya: jangan pakai domain utama yang juga dipakai buat email penting buat eksperimen redirect aneh-aneh. Pakai subdomain biar kalau ada salah setting, web utama kamu tetap aman.

## Tracking Klik: Perlu Nggak Sih?

Pertanyaan yang sering muncul: "bisa tahu berapa orang yang klik nggak?" Jawabannya: bisa, dan ada yang ringan banget.

Buat opsi PHP, cara paling gampang tanpa database: catat ke file teks. Tambahkan ini di `index.php` sebelum redirect:

```php
<?php
// ... array $links seperti sebelumnya ...

$slug = $_GET["slug"] ?? "";

if (isset($links[$slug])) {
    // Catat klik: tanggal, jam, slug, IP (opsional)
    $log = sprintf(
        "[%s] slug=%s ip=%s\n",
        date("Y-m-d H:i:s"),
        $slug,
        $_SERVER["REMOTE_ADDR"] ?? "-"
    );
    file_put_contents(__DIR__ . "/klik.log", $log, FILE_APPEND | LOCK_EX);

    header("Location: " . $links[$slug], true, 302);
    exit;
}
// ... halaman 404 ...
?>
```

File `klik.log` bakal keisi baris kayak `[2026-10-05 14:22:10] slug=daftar ip=36.xxx.xxx.xxx` setiap ada yang klik. Mau tahu total klik link "daftar" bulan ini? Tinggal `grep -c "slug=daftar" klik.log` via SSH, atau download file-nya terus hitung manual. Sederhana, tapi buat kebutuhan "pengen tahu rame nggak" udah lebih dari cukup.

Tapi jujur, saya mau kasih opini: **jangan overthinking soal tracking.** Kebanyakan orang bikin shortlink terus obsesif ngecek statistik tiap jam, padahal yang penting itu link-nya jalan dan orang nyampe tujuan. Tracking itu bonus, bukan tujuan. Kalau kamu butuh analitik serius (grafik, lokasi pengunjung, device), baru pertimbangkan pasang tools kayak Umami atau Plausible yang ringan dan menghargai privasi — tapi itu udah topik artikel lain.

Buat opsi GitHub Pages (statis), tracking server-side nggak bisa karena nggak ada server. Solusi ringannya: pakai layanan analitik pihak ketiga yang berbasis JavaScript, atau... ya udah, skip aja. Nggak semua hal perlu diukur. Saya sendiri buat shortlink GitHub Pages nggak pakai tracking sama sekali dan hidup saya baik-baik aja.

Satu catatan privasi, biar kita jadi orang baik: kalau kamu nyatet IP pengunjung, jangan disebar-sebar, dan kalau shortlink-nya dipakai buat publik luas, pertimbangkan buat nggak nyatet IP sama sekali. Catat slug + waktunya aja cukup.

## Tips Bikin Slug yang Enak Dilihat (dan Diketik)

Slug itu bagian belakang shortlink — `go.namakamu.id/daftar`, nah "daftar" itu slug-nya. Sepele, tapi slug yang bagus bikin shortlink kamu 10x lebih berguna. Ini pelajaran yang saya dapat setelah bikin slug ngawur berkali-kali:

**Pendek, tapi jangan misterius.** `go.namakamu.id/a1` itu pendek, tapi orang nggak tahu isinya apa dan takut klik. `go.namakamu.id/daftar` sedikit lebih panjang tapi jelas. Kecuali buat link sekali pakai, selalu pilih yang deskriptif.

**Pakai kata yang gampang dieja lewat telepon.** Percaya deh, suatu hari kamu bakal bacain shortlink kamu lewat telepon atau voice note: "buka go dot namakamu dot id garis miring daftar". Kalau slug-nya `d4ft4r-xYz`, selamat berjuang. Huruf kecil semua, kata biasa, pisahkan dengan strip kalau perlu: `materi-kelas-12` jauh lebih aman dibanding `MateriKelas12` (orang bingung kapitalnya di mana).

**Konsisten pakai satu pola.** Misalnya semua link formulir pakai awalan `form-`: `form-daftar`, `form-feedback`. Semua materi: `materi-`. Nanti kamu nggak perlu buka-buka catatan buat ingat slug-nya apa — tinggal tebak polanya. Saya nyesel nggak ngelakuin ini dari awal; daftar link saya yang lama itu campur aduk kayak mie.

**Jangan pakai spasi atau karakter aneh.** Cukup huruf kecil, angka, dan strip (`-`). Underscore (`_`) kelihatan mirip spasi di beberapa font dan bikin orang salah ketik. Titik juga hindari kecuali perlu.

**Buat link penting, bikin slug yang "abadi".** Maksudnya: jangan kasih nama yang bakal kedaluwarsa, kayak `daftar-2024` buat formulir yang tiap tahun ada. Mending slug-nya `daftar` aja, dan tiap tahun kamu ganti tujuan redirect-nya ke formulir terbaru. Orang yang nyimpen link lama tetap nyampe ke tempat yang benar. Ini trik kecil yang dampaknya gede banget buat link yang disebar di brosur cetak atau bio Instagram yang jarang diganti.

## Penutup: Link Kecil, Dampaknya Nggak Kecil

Kalau dipikir-pikir, lucu juga: artikel sepanjang ini cuma buat bahas link pendek. Tapi justru di situlah poinnya — hal-hal kecil yang kita anggap sepele kayak link yang rapi itu sebenarnya ngaruh ke cara orang memandang kita. Link pendek yang jelas bikin orang berani klik. Bikin yang share — kamu — kelihatan niat dan profesional. Dan di dunia di mana semua orang berlomba-lomba kelihatan profesional, detail kecil kayak gini yang bikin beda.

Kamu nggak perlu langsung bikin yang paling canggih. Mulai dari yang paling gampang: daftar s.id hari ini, bikin satu shortlink buat link yang paling sering kamu share. Nanti kalau udah ngerasain enaknya, naik ke self-host PHP atau trik GitHub Pages. Saya mulai dari bit.ly, pindah ke s.id, terus akhirnya self-host — tiap tahap ada pelajarannya sendiri, dan nggak ada yang sia-sia.

Satu hal terakhir: shortlink yang paling bagus adalah shortlink yang dipakai. Jangan sampai kamu habis baca artikel 3000 kata ini terus nggak bikin apa-apa. Buka laptop (atau HP juga bisa), pilih satu opsi di atas, dan bikin shortlink pertamamu sekarang. Lima belas menit dari sekarang, kamu udah punya `sesuatu/namamu` yang bisa kamu share ke mana-mana dengan bangga. Selamat mencoba!
