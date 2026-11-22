---
title: Flash DAC KT02H20 Jadi JA11
date: 2026-11-22
tags: [android, dac, audio, termux, tutorial]
description: Dongle DAC murah berchip KT02H20 (termasuk JCALLY JM12) bisa diubah jadi JadeAudio JA11 dengan flash firmware, langsung dari HP tanpa PC. Ini tutorial lengkapnya: dua cara (aplikasi KT Flasher dan Termux), link unduh firmware dan alatnya, langkah verifikasi, sampai pemulihan kalau gagal di tengah.
---

## Dongle Enam Puluh Ribu yang Isinya JA11

Beberapa waktu lalu saya beli dongle DAC USB-C generik seharga Rp62.400. Tidak ada merek meyakinkan, kemasannya polos, tapi chip di dalamnya yang bikin saya penasaran: **KTMicro KT02H20**. Chip ini ternyata hardware yang sama persis dengan yang dipakai **FiiO JA11** dan **JCALLY JM12**. Bedanya cuma di firmware.

Artinya, dongle generik itu sebenarnya satu flash firmware jauhnya dari berubah menjadi JadeAudio JA11. Keuntungan utamanya bukan cuma ganti nama: sesudah memakai firmware JA11, dongle dikenali aplikasi **FiiO Control**, jadi pengaturan seperti EQ / PEQ, volume keluaran, dan mode mikrofon bisa diakses. Sesuatu yang tidak bisa dilakukan firmware bawaan dongle generik.

Saya sudah membuktikannya sendiri di dongle saya: flash selesai dalam hitungan detik, dongle terdeteksi ulang sebagai JadeAudio JA11, dan FiiO Control mengenalinya tanpa masalah. Beberapa pemilik JM12 juga sudah berhasil memakai cara yang sama. Nah, di artikel ini saya tulis tutorial lengkapnya, dua cara sekaligus: pakai aplikasi Android **KT Flasher** (paling gampang, tanpa Termux), dan pakai **Termux** (cara aslinya). Semua dari HP, tanpa PC, tanpa root.

## Baca Dulu Sebelum Mulai

Tiga hal ini wajib dipahami sebelum menyentuh tombol flash apa pun:

- **Satu arah.** Boot ROM chip KT02H20 tidak punya perintah baca, jadi firmware bawaan dongle **tidak bisa di-backup**. Sekali firmware JA11 masuk, tidak ada jalan kembali ke firmware bawaan. Yang bisa ditimpa ulang hanyalah firmware JA11 itu sendiri atau image KT02H20B lain (misalnya untuk downgrade versi JA11).
- **Pastikan chip dongle kamu memang KT02H20.** Satu listing penjual yang sama sering menjual banyak varian chip (CX31993, ALC5686, CS46L41, dan lainnya) dalam kemasan yang mirip. Tutorial ini **hanya** untuk varian KT02H20. Kabar baiknya, kedua alat di bawah akan memeriksa ID chip sebelum menghapus apa pun dan berhenti dengan aman kalau chipnya bukan KT02H20B. Jadi selama kamu mengikuti langkahnya berurutan, dongle beda chip tidak akan rusak, cuma prosesnya batal.
- **Risiko brick permanen kecil.** Boot ROM tidak pernah ditimpa dan header firmware ditulis paling akhir, jadi kegagalan tulis di tengah jalan normalnya hanya membuat dongle tertahan di mode bootloader, dan itu bisa dipulihkan (ada bagian Pemulihan di bawah).

Selama proses flash berjalan: pastikan baterai HP cukup, kabel atau adapter OTG dalam kondisi bagus, dan jangan sentuh atau cabut konektor sampai proses selesai.

## Perangkat yang Didukung

Semua dongle berchip KTMicro KT02H20, antara lain:

- Dongle generik KT02H20 tanpa merek (yang saya pakai salah satunya)
- JCALLY JM12
- FiiO / JadeAudio JA11 itu sendiri (untuk flash ulang atau downgrade firmware)

Cara mengenalinya sebelum membeli: penjual yang jujur biasanya mencantumkan nama chip di deskripsi. Sesudah dongle di tangan, langkah Probe di bawah akan membaca identitas USB-nya. Dongle KT02H20 mode normal terbaca dengan VID `31b2` (misalnya `31b2:0111`).

## Unduhan

Siapkan tiga hal ini:

1. **Aplikasi KT Flasher** (untuk Cara 1). Unduh APK versi terbaru dari halaman rilis resminya:
   https://github.com/craxid/kt-flasher/releases
   Versi terbaru saat artikel ini ditulis adalah v1.3.1. Aplikasi ini tidak menyertakan firmware di dalamnya, jadi firmware tetap kamu unduh sendiri dari poin berikutnya.
2. **Firmware JadeAudio JA11 V2.2 dan alat Termux** (firmware untuk kedua cara, alatnya untuk Cara 2). Keduanya ada di dalam satu repo hasil reverse engineering updater resmi KTMicro:
   https://github.com/dragonzords/KT02H20-FLASHER-RE
   Di dalam repo itu sudah ada berkas `JadeAudio JA11_V2.2.bin` (firmware-nya) dan `ktflash.py` (alat flash untuk Termux). Data firmware yang benar: ukuran **67.312 byte**, **67 paket**, chip **KT02H20B**, CRC **0xcf975bc0**. Nanti langkah validasi akan menampilkan angka-angka ini; cocokkan, kalau beda berarti berkasmu salah atau rusak.
3. **Termux dan Termux:API** (khusus Cara 2). Pasang keduanya dari sumber yang sama, disarankan F-Droid. Aplikasi Termux:API wajib ikut terpasang di HP, bukan cuma paketnya di dalam Termux.

Buat verifikasi hasil di akhir, pasang juga aplikasi **FiiO Control** dari Play Store.

## Cara 1: Flash Pakai Aplikasi KT Flasher (Paling Gampang)

Cara ini tidak butuh Termux sama sekali. Semua langkah keamanan di cara Termux (cek chip sebelum hapus, konfirmasi eksplisit, header ditulis terakhir) ada juga di sini.

1. Pasang APK KT Flasher yang sudah kamu unduh, lalu colok dongle ke HP lewat OTG.
2. Buka KT Flasher, jalankan **Probe**. Android akan meminta izin akses USB, ketuk **Allow**. Dongle KT02H20 kamu harusnya terbaca di daftar (VID `31b2`).
3. Pilih berkas firmware `JadeAudio JA11_V2.2.bin` lewat pemilih berkas di aplikasi, lalu jalankan **validasi image**. Pastikan hasilnya menampilkan chip `KT02H20B`, ukuran 67.312 byte, 67 paket, CRC `0xcf975bc0`.
4. Jalankan **Dry run**. Tahap ini cuma simulasi, tidak ada data yang ditulis ke dongle. Pastikan rencana paketnya bersih tanpa error.
5. Jalankan **Flash**. Urutan yang akan terjadi:
   - Aplikasi meminta izin USB untuk dongle mode normal (ketuk **Allow**), lalu mengirim perintah masuk bootloader. Dongle akan lepas dan muncul lagi sebagai perangkat baru `8888:cdc0`.
   - Android menampilkan izin USB **kedua** untuk perangkat bootloader itu. Ketuk **Allow** juga, jangan sampai terlewat.
   - Aplikasi melakukan handshake dan membaca ID chip dari dongle. Kalau bukan `KT02H20B`, proses batal di sini sebelum ada yang dihapus.
   - Kalau cocok, muncul dialog konfirmasi hapus dan tulis. Baca baik-baik, lalu konfirmasi.
   - 67 paket ditulis satu per satu dengan indikator progres. Di dongle saya seluruh penulisan selesai dalam waktu kurang dari dua detik. Jangan sentuh konektor selama tahap ini.
6. Sesudah muncul status selesai, cabut dongle lalu colok lagi supaya firmware baru berjalan.

Catatan soal izin USB: izin akan muncul **dua kali** dan itu normal, karena dongle berganti identitas di tengah proses. Di versi aplikasi v1.3.1 ke atas jumlahnya memang hanya dua; kalau ada aplikasi lain yang memicu izin ketiga, abaikan dulu dan selesaikan sesi flash-nya.

Satu lagi: kalau handshake gagal karena dongle tertinggal di mode bootloader dari percobaan sebelumnya, KT Flasher v1.2.1 ke atas akan menawari pemulihan terpandu cabut-colok. Ikuti saja arahannya; cara itu sudah terbukti berhasil di JM12 yang nyangkut persis di keadaan tersebut.

## Cara 2: Flash Pakai Termux (Cara Asli)

Cara ini memakai alat asalnya, `ktflash.py`. Cocok buat yang memang sudah nyaman di Termux atau mau melihat prosesnya lebih transparan.

### Tahap 1: Siapkan Termux

Jalankan di Termux:

```sh
pkg install python git libusb termux-api
python3 -m pip install "libusb1>=3"
```

Dua jebakan yang sering bikin orang gagal di tahap ini:

- `libusb1` wajib versi 3.0 atau lebih baru; versi lama tidak bisa membuka file descriptor USB dari Android.
- Selalu pasang lewat `python3 -m pip`, jangan `pip` polos. Di Termux yang `pip`-nya terikat ke Python lama, paketnya nyasar ke site-packages Python lain dan tetap tidak bisa diimpor oleh `python3` yang menjalankan skrip. Gejalanya `ModuleNotFoundError: No module named 'usb1'` padahal pip bilang sudah terpasang.

Kalau muncul error `libusb-1.0.so not found`, jalankan dulu:

```sh
export LD_LIBRARY_PATH=$PREFIX/lib
```

### Tahap 2: Ambil Alat dan Firmware

```sh
git clone https://github.com/dragonzords/KT02H20-FLASHER-RE.git
cd KT02H20-FLASHER-RE
```

Di dalam folder repo sudah ada `ktflash.py` dan `JadeAudio JA11_V2.2.bin`. Tidak ada lagi yang perlu diunduh.

### Tahap 3: Cek Dongle Terbaca (Probe)

Colok dongle ke HP lewat OTG, lalu:

```sh
python3 ktflash.py probe
```

Android akan meminta izin akses USB, ketuk **Allow**. Hasil yang diharapkan kurang lebih:

```
USB devices (termux-usb):
  /dev/bus/usb/001/022  31b2:2008 <- KT dongle (app mode)
```

Kalau VID dongle kamu berbeda (misalnya `2972` karena sudah memakai firmware JA11), sampaikan ke alat sebelum subcommand, contoh: `python3 ktflash.py --vid 0x2972 probe`.

Kalau probe tidak menemukan apa pun: cek sambungan OTG, cabut colok dongle, pastikan izin USB diberikan. Jangan lanjut ke tahap berikutnya sebelum dongle terdeteksi di sini.

### Tahap 4: Validasi Firmware

```sh
python3 ktflash.py image "JadeAudio JA11_V2.2.bin"
```

Perintah ini memeriksa magic, field ukuran, dan ID chip di dalam berkas firmware, lalu menampilkan rencana paketnya. Pastikan terbaca chip `KT02H20B`, ukuran 67.312 byte, 67 paket. Tahap ini aman, tidak menulis apa pun.

### Tahap 5: Dry Run

```sh
python3 ktflash.py flash "JadeAudio JA11_V2.2.bin"
```

Tanpa flag tambahan, perintah flash hanya simulasi. Tidak ada data yang dikirim untuk ditulis ke dongle. Tahap ini untuk memastikan semua langkah persiapan bersih sebelum menulis sungguhan.

### Tahap 6: Flash Sungguhan

```sh
python3 ktflash.py flash "JadeAudio JA11_V2.2.bin" --execute --yes --no-backup-ok
```

Ketiga flag itu wajib ada semua: `--execute` (benar-benar menulis), `--yes` (konfirmasi), `--no-backup-ok` (paham firmware bawaan tidak bisa di-backup). Yang terjadi selama proses:

1. Alat meminta izin USB untuk dongle mode normal, ketuk **Allow**. Alat mengirim perintah masuk bootloader, dongle lepas dan muncul lagi sebagai perangkat baru `8888:cdc0`.
2. Android menampilkan izin USB **kedua** untuk perangkat bootloader itu. Ketuk **Allow** juga. Alat menunggu sampai 60 detik, jangan sampai terlewat.
3. Alat melakukan handshake, lalu membaca ID chip dari dongle. Kalau ID-nya bukan `KT02H20B`, proses batal di sini, sebelum ada yang dihapus, dan dongle kamu tetap utuh.
4. Kalau cocok, alat menghapus dan menulis 67 paket satu per satu dengan indikator progres. Jangan sentuh konektor selama tahap ini.
5. Muncul tulisan `write complete`. Selesai. Cabut dongle, lalu colok lagi supaya firmware baru berjalan.

## Verifikasi Hasil

- Colok ulang dongle. Namanya sekarang terbaca sebagai **USB-Audio - JadeAudio JA11** (USB `2972:0102`).
- Putar lagu, pastikan suara keluar normal di kanal kiri dan kanan.
- Tes jalur mic dengan headset yang punya mic, pastikan mic tetap berfungsi.
- Buka aplikasi **FiiO Control**: dongle harusnya dikenali sebagai JadeAudio JA11 dan pengaturan seperti EQ / PEQ bisa diakses. Ini keuntungan utama firmware JA11 dibanding firmware bawaan dongle generik.

## Pemulihan Kalau Flash Gagal di Tengah

Jangan panik. Kegagalan tulis normalnya membuat dongle tertahan di mode bootloader (`8888:cdc0`), karena boot ROM tidak pernah ditimpa dan image yang belum lengkap tidak akan dicoba untuk boot.

1. Cabut dongle, colok lagi. Langkah ini penting karena handshake bootloader hanya diterima sekali per sesi boot.
2. Cek dengan Probe (di aplikasi, atau `python3 ktflash.py probe` di Termux), dongle akan terbaca sebagai bootloader.
3. Ulangi proses flash dari awal dengan firmware yang sama sampai selesai.

## Masalah yang Mungkin Muncul

- **`termux-usb not found`**: paket `termux-api` belum terpasang di Termux, atau aplikasi Termux:API belum terpasang di HP.
- **`(no answer - permission denied?)` di hasil probe padahal izin USB sudah diberikan**: pesan ini menyesatkan, probe menelan error aslinya. Penyebab terseringnya proses gagal membuka perangkat karena `libusb1` belum terpasang di `python3` yang aktif. Uji dengan `python3 -c "import usb1; print(usb1.__version__)"` (harus 3.x), lalu perbaiki dengan `python3 -m pip install -U "libusb1>=3"`.
- **`no matching dongle ... found via termux-usb`**: OTG belum tersambung, izin USB belum diberikan, atau VID dongle bukan `31b2` (pakai `--vid`).
- **`bootloader did not show up / was not authorised within 60s`**: izin USB kedua terlewat. Cabut colok dan ulangi.
- **`no handshake ack (0x78)`**: handshake sesi boot ini sudah terpakai, biasanya karena percobaan flash sebelumnya di sesi colok yang sama. Cabut colok dongle, lalu coba lagi.
- **`chip ... does not match image ...`**: chip dongle bukan KT02H20B. Proses batal sebelum menghapus apa pun. Dongle tetap bisa dipakai normal, tapi jangan dipaksakan flash firmware ini.
- **`write failed at packet N/M`**: cabut colok, lalu flash ulang dari awal sesuai bagian Pemulihan.

## Ringkasan Perintah Termux

```sh
python3 ktflash.py probe
python3 ktflash.py image "JadeAudio JA11_V2.2.bin"
python3 ktflash.py flash "JadeAudio JA11_V2.2.bin"
python3 ktflash.py flash "JadeAudio JA11_V2.2.bin" --execute --yes --no-backup-ok
```

## Kredit dan Penutup

Alat flash aslinya adalah hasil reverse engineering updater resmi KTMicro oleh txtsamu dan dragonzords, berlisensi MIT: https://github.com/dragonzords/KT02H20-FLASHER-RE. Aplikasi KT Flasher adalah porting Android dari alat yang sama, dibuat oleh CraXID Project: https://github.com/craxid/kt-flasher.

Firmware JA11 adalah milik FiiO / JadeAudio; artikel ini tidak membagikan berkasnya secara langsung, silakan ambil dari repo alat di atas. Saya tidak berafiliasi dengan FiiO, JadeAudio, JCALLY, maupun KTMicro. Semua risiko flashing ditanggung sendiri, tapi selama chip dongle kamu benar KT02H20 dan langkahnya diikuti berurutan, prosesnya sudah terbukti aman dan bisa dipulihkan. Selamat ngoprek.
