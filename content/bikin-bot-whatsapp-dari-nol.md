---
title: Bikin Bot WhatsApp
date: 2026-10-03
tags: [bot, whatsapp, tutorial, nodejs]
description: Panduan lengkap bikin bot WhatsApp dari nol — dari pilih library, pairing, perintah pertama, sampai masalah nyata seperti disconnect dan banned. Berdasarkan pengalaman, bukan dokumentasi kering.
---

## Kenapa Saya Bikin Bot

Ceritanya mulai dari grup keluarga. Grup yang isinya 40 orang, yang aktif cuma 5, dan yang rajin cuma kirim "selamat pagi" pakai gambar bunga tiap jam 6 pagi. Saya yang waktu itu lagi gabut dan baru belajar Node.js kepikiran: gimana kalau saya bikin sesuatu yang bikin grup ini sedikit lebih hidup?

Awalnya cuma iseng. Bot yang bisa jawab "P" dengan "saya online". Nggak ada gunanya sama sekali selain buat pamer ke sepupu. Tapi dari "P" itulah semuanya mulai. Tiga tahun kemudian, bot itu udah bisa bikin stiker, ngingetin jadwal, nyari info cuaca, dan jadi asisten kecil yang lumayan diandalkan.

Artikel ini adalah semua yang saya pelajari sepanjang jalan itu — termasuk semua kesalahan bodoh yang saya harap ada yang ngasih tahu duluan.

## Gambaran Besarnya Dulu, Jangan Langsung Ngoding

Kesalahan pertama saya waktu mulai: langsung install library dan ngoding tanpa ngerti arsitekturnya. Hasilnya? Script 800 baris yang saya sendiri nggak ngerti alurnya dua minggu kemudian.

Jadi sebelum sentuh kode, pahami dulu anatomi bot WhatsApp. Sederhananya ada tiga lapisan:

**Lapisan 1: Koneksi.** Ini bagian yang bikin HP kamu (atau server) "login" ke WhatsApp sebagai perangkat tertaut — sama kayak WhatsApp Web. Library yang populer buat ini namanya Baileys. Tugas lapisan ini cuma satu: jaga koneksi tetap hidup. Kalau lapisan ini mati, bot kamu mati total, sesakti apa pun kodenya.

**Lapisan 2: Router.** Setiap pesan yang masuk harus dibaca dan diputuskan: ini perintah atau bukan? Kalau perintah, perintah yang mana? Router ini biasanya sesederhana: cek apakah pesan diawali tanda seru (misalnya `!stiker`), terus cocokkan kata pertamanya dengan daftar perintah yang terdaftar.

**Lapisan 3: Handler.** Ini dapurnya. Setiap perintah punya fungsi sendiri: `!stiker` manggil fungsi bikin stiker, `!cuaca` manggil fungsi yang nanya ke API cuaca, dan seterusnya. Handler-handler ini yang bikin bot kamu unik — koneksi dan router semua bot itu mirip-mirip, tapi handler itu sidik jarinya.

Kalau kamu paham tiga lapisan ini, semua tutorial bot di internet bakal langsung masuk akal. Kalau nggak paham, kamu cuma akan copy-paste tanpa ngerti.

## Persiapan: yang Kamu Butuhkan

Nggak banyak, jujur:

1. **Nomor WhatsApp khusus buat bot.** Ini penting dan nggak bisa ditawar. Jangan pakai nomor pribadimu. Kenapa? Nanti saya jelaskan di bagian banned — intinya, bot itu melanggar ketentuan WhatsApp secara teknis, dan nomor bot bisa kena banned kapan aja. Nomor pribadi kamu terlalu berharga buat dipertaruhkan. Beli kartu perdana murah, registrasi, verifikasi, selesai.

2. **Node.js versi LTS.** Download dari nodejs.org, install, cek dengan `node -v`. Kalau keluar nomor versi, beres.

3. **HP dengan WhatsApp yang bisa scan QR** (atau terima kode pairing). Ini buat proses login awal.

4. **Tempat jalanin bot.** Buat tahap belajar, laptop kamu cukup. Nanti kalau mau 24 jam, baru mikir VPS atau sejenisnya.

5. **Kesabaran.** Bukan bercanda. Bagian tersulit bikin bot bukan kodingnya — tapi debugging waktu koneksi putus jam 3 pagi.

## Langkah 1: Project Pertama dan Koneksi

Bikin folder baru, buka terminal di situ, jalanin:

```bash
npm init -y
npm install @whiskeysockets/baileys
```

Terus bikin file `index.js` dengan kode paling minimal buat konek:

```javascript
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('sesi');
  const sock = makeWASocket({ auth: state });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, qr } = update;
    if (qr) {
      console.log('Scan QR ini pakai WhatsApp di HP kamu!');
      // QR akan muncul di terminal, atau pakai library qrcode-terminal
    }
    if (connection === 'open') console.log('Bot online!');
    if (connection === 'close') console.log('Koneksi putus, coba lagi...');
  });
}

start();
```

Jalanin pakai `node index.js`. Nanti muncul QR di terminal — scan pakai WhatsApp di HP (Setelan > Perangkat Tertaut > Tautkan Perangkat). Kalau berhasil, console nulis "Bot online!" dan... ya sudah, bot kamu online tapi nggak bisa apa-apa. Kayak bayi baru lahir: hidup, tapi cuma bisa nangis.

Oh iya, folder `sesi` yang kebikin otomatis itu PENTING. Isinya kredensial login. Jangan pernah share folder itu ke siapa pun, jangan upload ke GitHub. Itu setara password akun WhatsApp bot kamu.

## Langkah 2: Perintah Pertama — "P" yang Legendaris

Sekarang bikin botnya bisa ngapa-ngapain. Tambahkan ini di dalam fungsi `start`, setelah socket kebikin:

```javascript
sock.ev.on('messages.upsert', async ({ messages }) => {
  const msg = messages[0];
  if (!msg.message || msg.key.fromMe) return;

  const teks = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
  const dari = msg.key.remoteJid;

  // Router paling sederhana sedunia
  if (teks.trim().toLowerCase() === 'p') {
    await sock.sendMessage(dari, { text: 'Online, bang.' });
  }

  if (teks.startsWith('!ping')) {
    const awal = Date.now();
    await sock.sendMessage(dari, { text: 'Pong!' });
    const latency = Date.now() - awal;
    await sock.sendMessage(dari, { text: `Kecepatan respon: ${latency}ms` });
  }
});
```

Kirim "P" ke nomor bot dari HP lain. Kalau dibalas "Online, bang.", selamat — kamu resmi jadi bot developer. Rasanya? Jujur, waktu pertama kali bot saya membalas, saya senyum-senyum sendiri kayak orang aneh. Momen kecil yang nagih.

Perhatikan pola router di atas: ambil teks pesan, cocokkan dengan perintah, kirim balasan. Semua perintah bot — dari yang paling sederhana sampai yang paling canggih — intinya cuma variasi dari pola ini.

## Langkah 3: Perintah yang Beneran Berguna — Stiker

`!ping` itu lucu buat lima menit. Perintah yang bikin orang betah di grup itu yang berguna. Dan perintah paling legendaris di dunia per-bot-an Indonesia adalah: **bikin stiker**.

Logikanya: user kirim gambar dengan caption `!stiker` (atau reply gambar pakai `!stiker`), bot download gambarnya, convert jadi stiker WebP, kirim balik sebagai stiker.

```javascript
if (teks.startsWith('!stiker')) {
  const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
  const gambar = quoted?.imageMessage || msg.message.imageMessage;

  if (!gambar) {
    await sock.sendMessage(dari, { text: 'Kirim gambar dengan caption !stiker, atau reply gambar pakai !stiker' });
    return;
  }

  await sock.sendMessage(dari, { text: 'Bentar, lagi dibikin...' });

  const buffer = await downloadMedia(gambar); // pakai fungsi download dari Baileys
  const stiker = await convertKeWebP(buffer); // pakai sharp atau ffmpeg

  await sock.sendMessage(dari, { sticker: stiker });
}
```

Saya sengaja nggak tulis detail fungsi convert-nya di sini karena library-nya ganti-ganti tiap tahun (dulu pakai `ffmpeg`, sekarang banyak yang pakai `sharp`). Prinsipnya tetap sama: download → convert ke WebP 512x512 → kirim sebagai stiker.

Waktu pertama kali perintah stiker ini jalan di grup keluarga saya, efeknya langsung: grup yang tadinya sepi jadi rame. Orang-orang mulai kirim foto aneh-aneh cuma buat dijadiin stiker. Misi "menghidupkan grup" tercapai — bahkan kelewatan, sampai saya harus bikin perintah `!ban` bercanda buat yang kebanyakan.

## Naik Level: Bot yang Keluar Kandang

Stiker itu seru, tapi bot yang cuma bisa bikin stiker itu kayak warung yang cuma jual satu menu. Biar naik kelas, bot kamu harus bisa ngobrol sama dunia luar — API.

Contoh paling gampang: perintah cuaca.

```javascript
if (teks.startsWith('!cuaca')) {
  const kota = teks.replace('!cuaca', '').trim() || 'jakarta';

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=API_KEY_KAMU&units=metric&lang=id`);
    const data = await res.json();

    if (data.cod !== 200) {
      await sock.sendMessage(dari, { text: `Kota "${kota}" nggak ketemu. Coba ejaannya.` });
      return;
    }

    const balasan = `Cuaca di ${data.name}:\n` +
      `Suhu: ${data.main.temp}°C\n` +
      `Kondisi: ${data.weather[0].description}\n` +
      `Kelembapan: ${data.main.humidity}%`;

    await sock.sendMessage(dari, { text: balasan });
  } catch (e) {
    await sock.sendMessage(dari, { text: 'Duh, API cuacanya lagi ngambek. Coba lagi nanti.' });
  }
}
```

Pola ini — ambil input user, panggil API, format hasilnya jadi teks yang enak dibaca — bisa dipakai buat sejuta hal: jadwal sholat, harga crypto, lirik lagu, terjemahan, info gempa BMKG. Begitu kamu ngerti polanya, ide perintah nggak akan habis.

Satu nasihat dari pengalaman: **selalu bungkus panggilan API pakai try-catch.** API itu makhluk yang nggak bisa dipercaya — kadang lambat, kadang mati, kadang format balasannya berubah tanpa pemberitahuan. Bot yang crash gara-gara API mati itu memalukan. Bot yang jawab "API-nya lagi ngambek, coba lagi nanti" itu profesional.

## Bot Butuh Ingatan: Database Sederhana

Sampai titik ini bot kamu itu kayak ikan mas koki — tiap pesan diperlakukan sebagai hal baru, nggak ingat apa-apa. Mau bikin fitur kayak poin user, daftar hitam, atau pengingat? Butuh ingatan.

Buat awal, nggak perlu database beneran. File JSON cukup:

```javascript
const fs = require('fs');

function bacaDB() {
  try {
    return JSON.parse(fs.readFileSync('./db.json', 'utf8'));
  } catch {
    return { users: {} };
  }
}

function tulisDB(data) {
  fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));
}

// Contoh pakai: sistem poin
if (teks.startsWith('!poin')) {
  const db = bacaDB();
  const pengirim = msg.key.participant || dari;

  db.users[pengirim] = db.users[pengirim] || { poin: 0 };
  db.users[pengirim].poin += 10;
  tulisDB(db);

  await sock.sendMessage(dari, {
    text: `+10 poin! Total kamu: ${db.users[pengirim].poin} poin.`
  });
}
```

Sederhana, jelek, tapi jalan. Nanti kalau user-nya udah ratusan dan file JSON-nya mulai lemot, baru mikir SQLite atau sejenisnya. Jangan over-engineering di awal — itu jebakan yang bikin banyak project bot mati sebelum jadi.

## Masalah yang Pasti Kamu Temui (dan Cara Selamat)

Nah, ini bagian yang nggak ada di tutorial-tutorial manis. Ini masalah nyata yang saya alami sendiri:

**Disconnect tengah malam.** Baileys itu koneksinya kadang putus sendiri — entah karena WhatsApp update protokol, jaringan goyang, atau alasan gaib. Solusinya: bikin mekanisme reconnect otomatis. Di event `connection.update`, kalau status `close` dan alasannya bukan `loggedOut`, panggil `start()` lagi. Dan pasang notifikasi ke nomor pribadimu biar kamu tahu kalau bot mati. Saya pakai trik sederhana: bot kirim pesan "saya mati, tolong hidupkan" ke nomor saya sebelum benar-benar mati. Dramatis, tapi efektif.

**Banned.** Ini yang paling serem. WhatsApp secara resmi nggak mengizinkan bot pihak ketiga. Praktiknya, ribuan bot jalan tiap hari tanpa masalah — TAPI risikonya nyata. Dari pengalaman komunitas, pola yang bikin cepat kena banned:

- Spam: bot yang kirim ratusan pesan per menit ke banyak nomor asing. Ini bunuh diri tercepat.
- Nomor baru langsung gaspol. Nomor fresh yang tiba-tiba aktif banget itu mencurigakan di mata sistem. "Hangatkan" dulu nomornya: pakai normal beberapa hari sebelum dijadikan bot.
- Dilaporkan user. Kalau bot kamu dipakai buat spam atau hal nyebelin, orang bakal report, dan report = banned cepat.

Itulah kenapa saya bilang di awal: pakai nomor khusus. Nomor bot itu barang sekali pakai secara mental — sayangi, tapi siap kehilangan.

**Memori bocor.** Bot yang jalan berminggu-minggu tanpa restart bisa makin lemot karena memori numpuk (terutama kalau sering download media). Solusi kampung tapi ampuh: restart otomatis tiap 24 jam di jam sepi, misalnya jam 4 pagi. Tambahin pesan "bot restart bentar ya" biar user nggak bingung.

**QR ribet tiap restart.** Kalau sesi tersimpan dengan benar di folder `sesi`, kamu cuma perlu scan QR sekali. Kalau tiap restart diminta scan lagi, berarti ada yang salah sama penyimpanan sesinya — biasanya karena folder sesi kehapus atau permission bermasalah.

## Rapikan Kodemu Sebelum Menyesal

Ingat script 800 baris saya yang nggak karuan itu? Jangan ulangi kesalahan saya. Dari awal, pisahkan perintah ke file masing-masing:

```
bot/
├── index.js          # koneksi + router doang
├── sesi/             # kredensial (jangan di-upload!)
├── db.json           # database sederhana
└── perintah/
    ├── ping.js
    ├── stiker.js
    ├── cuaca.js
    └── poin.js
```

Tiap file di folder `perintah` export satu fungsi. Router di `index.js` tinggal manggil fungsi yang sesuai. Nanti waktu perintahmu udah 30, kamu bakal berterima kasih sama diri sendiri yang dulu rajin misahin file.

## Etika: Bot yang Baik Itu Bot yang Sopan

Bagian ini penting dan sering dilupakan. Bot kamu hidup di ruang sosial orang lain. Beberapa aturan tak tertulis yang saya pegang:

1. **Jangan spam.** Bot yang kirim pesan tanpa diminta itu pengganggu, bukan asisten. Pengecualian cuma buat hal yang user-nya sendiri minta, kayak pengingat.
2. **Kasih cara matiin.** Tiap fitur otomatis harus ada cara buat berhenti. Nggak ada yang lebih nyebelin dari bot yang nggak bisa disuruh diam.
3. **Jangan baca privasi orang.** Secara teknis bot bisa baca semua pesan di grup. Jangan disalahgunakan. Jangan bikin fitur "laporin siapa yang hapus pesan" — itu racun buat kepercayaan grup.
4. **Bilang kalau kamu bot.** Jangan pura-pura jadi manusia. Orang berhak tahu mereka ngobrol sama mesin.

## Penutup: Dari "P" Sampai ke Mana?

Tiga tahun setelah "P" pertama itu, bot saya udah jauh berkembang — tapi kalau ditanya apa momen paling berkesan, jawabannya tetap malam pertama itu: waktu layar terminal nulis "Bot online!" dan HP saya bergetar nerima balasan "Online, bang." dari nomor yang saya daftarin sendiri.

Rasanya kayak Frankenstein waktu monsternya pertama kali gerak. Bedanya, monster saya cuma bisa bikin stiker.

Kalau kamu mau mulai, mulai aja sekarang. Nggak perlu nunggu paham semuanya — saya juga nggak paham semuanya waktu mulai. Bikin yang "P" dulu. Sisanya nyusul.

Dan kalau kamu penasaran pengen lihat bot yang udah jadi kayak apa, mampir ke halaman [/bot/](/bot/) saya. Siapa tahu menginspirasi — atau minimal menghibur.

## Biar Online 24 Jam: Pindah ke VPS

Selama bot jalan di laptop, dia cuma hidup waktu laptop nyala dan nggak tidur. Buat bot yang beneran diandalkan, kamu butuh dia jalan 24/7. Jawabannya: VPS (Virtual Private Server) — komputer sewaan di internet yang nyala terus.

Jangan bayangin yang mahal. Buat bot WhatsApp, spek kentang pun cukup — 1 CPU, 1-2GB RAM udah lebih dari cukup. Yang gratisan juga ada (tier gratis Oracle Cloud misalnya), walau daftarnya agak ribet.

Langkah kasarnya begini:

1. **Sewa/bikin VPS** dengan Ubuntu. Catat IP-nya.
2. **SSH ke VPS**, install Node.js sama kayak di laptop.
3. **Upload kode bot** — bisa pakai `git clone` dari GitHub (jangan lupa folder `sesi` JANGAN di-upload; nanti pairing ulang di VPS).
4. **Jalankan pakai process manager** biar tetap hidup walau kamu disconnect. Yang paling gampang: `pm2`.

```bash
npm install -g pm2
pm2 start index.js --name "bot-wa"
pm2 save
pm2 startup  # ikuti instruksinya biar jalan otomatis pas VPS reboot
```

Dengan pm2, kalau script kamu crash, dia otomatis restart. Kalau VPS reboot, bot jalan lagi sendiri. Kamu bisa tidur tenang.

Satu hal yang sering bikin kaget waktu pertama pindah ke VPS: **pairing ulang.** Sesi WhatsApp itu terikat perangkat. Waktu pertama jalanin di VPS, kamu harus scan QR lagi dari HP. Siapkan HP di sebelah waktu deploy pertama. Setelah itu nggak perlu lagi — sesi tersimpan di VPS.

Soal biaya: VPS termurah sekitar 60-100 ribu per bulan. Kalau itu kemahalan buat tahap belajar, alternatifnya: jalanin di HP Android bekas pakai Termux. Serius, bisa. Performa pas-pasan tapi buat belajar cukup. Saya pernah jalanin bot eksperimen di HP Xiaomi tua selama tiga bulan sebelum akhirnya pindah ke VPS.

## Fitur Lanjutan Buat yang Udah Ketagihan

Kalau dasarnya udah jalan dan kamu pengen naik kelas lagi, ini beberapa arah yang bisa dijelajahi:

**Penjadwal (cron).** Bikin bot kirim pesan otomatis tiap waktu tertentu — misalnya ringkasan jadwal hari ini tiap jam 6 pagi, atau pengingat minum obat. Di Node.js pakai library `node-cron`:

```javascript
const cron = require('node-cron');

// Tiap hari jam 6 pagi
cron.schedule('0 6 * * *', async () => {
  const idGrup = '120363xxxx@g.us'; // ID grup tujuan
  await sock.sendMessage(idGrup, {
    text: 'Selamat pagi! Jangan lupa sarapan.'
  });
});
```

Format waktunya `menit jam tanggal bulan hari` — butuh adaptasi dikit, tapi sekali paham, nagih.

**Manajemen grup.** Bot bisa jadi admin yang rajin: sambut member baru otomatis, kick yang kirim link tertentu, bikin voting. Event `group-participants.update` di Baileys ngasih tahu kamu tiap ada yang join/leave. Pesan sambutan otomatis itu fitur kecil yang efeknya besar — member baru langsung ngerasa diperhatikan.

**AI chatbot.** Ini yang lagi zaman: sambungin bot ke AI biar bisa jawab pertanyaan bebas, bukan cuma perintah kaku. Polanya sama kayak perintah cuaca tadi — bedanya API yang dipanggil adalah API AI. Tapi hati-hati: ini bikin biaya (API AI bayar per pemakaian) dan bikin bot kadang ngaco jawabnya. Saran saya: kuasai dulu bot perintah biasa sebelum terjun ke sini.

## Studi Kasus Nyata: Bot Grup Keluarga Saya Sekarang

Biar nggak cuma teori, saya kasih gambaran bot saya yang jalan sekarang di grup keluarga:

- **30-an perintah aktif**, dari `!stiker` sampai `!jadwal` (jadwal acara keluarga yang bisa ditambah semua member).
- **Jalan di VPS**, restart otomatis tiap jam 4 pagi, uptime 99% kecuali waktu saya iseng update.
- **Pernah kena banned sekali** — waktu awal-awal, saya iseng bikin fitur broadcast ke 50 kontak sekaligus. Nomornya mati dalam 2 jam. Pelajaran mahal: jangan pernah broadcast massal. Sejak ganti nomor dan berhenti broadcast, udah dua tahun aman.
- **Fitur favorit keluarga:** `!masak` — random rekomendasi masakan + resep singkat. Yang bikin ibu-ibu grup paling seneng. Kadang solusi terbaik itu yang paling sederhana.

Total biaya operasional: VPS 75 ribu/bulan + nomor perdana 15 ribu (sekali beli, perpanjang masa aktif aja). Lebih murah dari langganan streaming.

## FAQ

**Q: Butuh bisa ngoding jago buat bikin bot?**
A: Nggak. Dasar JavaScript cukup — variabel, fungsi, if-else, async/await. Sisanya belajar sambil jalan. Saya juga mulai dari nol.

**Q: Baileys doang pilihannya?**
A: Nggak, ada alternatif kayak whatsapp-web.js. Tapi Baileys itu yang paling aktif dikembangkan dan komunitas Indonesianya gede — kalau error, kemungkinan besar udah ada yang nanya di grup/issue tracker.

**Q: Bot saya tiba-tiba nggak bisa kirim pesan tapi masih online, kenapa?**
A: Cek tiga hal berurutan: (1) nomor bot kena limit sementara (biasanya pulih sendiri 24 jam), (2) format JID-nya bener nggak (grup pakai `@g.us`, personal pakai `@s.whatsapp.net`), (3) ada error di console yang ke-skip.

**Q: Aman nggak nyimpen sesi di VPS?**
A: Sama amannya dengan VPS-nya. Pakai provider yang reputasinya jelas, jangan share akses SSH ke sembarang orang, dan jangan pernah commit folder sesi ke Git. Kalau VPS-nya jebol, revoke sesi dari HP (Perangkat Tertaut > keluarkan) dan pairing ulang.

**Q: Bisa nggak bot jalan tanpa nomor HP sama sekali?**
A: Nggak bisa. WhatsApp itu butuh nomor terverifikasi. Nggak ada jalan pintas.

---

Udah, itu bekal lengkap dari nol sampai bot yang beneran hidup. Sisanya tinggal praktek — dan praktek itu nggak bisa digantiin artikel sepanjang apa pun. Buka terminal, install Baileys, scan QR pertama kamu. Nanti kalau bot kamu udah bisa jawab "P", kabarin saya. Saya ikut seneng.
