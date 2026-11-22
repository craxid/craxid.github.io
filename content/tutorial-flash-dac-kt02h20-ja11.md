---
title: Flash DAC KT02H20 Jadi JA11
date: 2026-11-22
tags: [android, dac, audio, tutorial]
description: Dongle DAC murah berchip KT02H20 (termasuk JCALLY JM12) bisa disulap jadi JadeAudio JA11 cuma modal HP, tanpa PC. Ini tutorial lengkapnya pakai aplikasi KT Flasher: link unduh aplikasinya dan firmware resmi JA11 V2.2, langkah flash dari awal sampai verifikasi, plus cara pulih kalau gagal di tengah.
---

## Dongle Enam Puluh Ribu yang Isinya JA11

Kemarin saya beli dongle DAC USB-C generik, harganya cuma Rp62.400. Nggak ada merek yang meyakinkan, kemasannya polos banget. Tapi yang bikin saya penasaran itu chip di dalamnya: **KTMicro KT02H20**. Ternyata chip ini hardware-nya sama persis kayak yang dipakai **FiiO JA11** dan **JCALLY JM12**. Bedanya cuma di firmware doang.

Jadi ceritanya, dongle generik itu sebenarnya tinggal sekali flash buat berubah jadi JadeAudio JA11. Untungnya bukan cuma ganti nama. Sesudah pakai firmware JA11, dongle-nya jadi dikenali aplikasi **FiiO Control**, jadi EQ / PEQ, volume keluaran, mode mikrofon, dan teman-temannya bisa diatur. Firmware bawaan dongle generik mana bisa begitu.

Saya udah buktiin sendiri di dongle saya: flash-nya kelar dalam hitungan detik, dongle kedeteksi ulang sebagai JadeAudio JA11, dan FiiO Control langsung mengenalinya. Beberapa pemilik JM12 juga udah berhasil pakai cara yang sama. Nah, di artikel ini saya tulis tutorial lengkapnya pakai aplikasi **KT Flasher**. Semua dari HP, tanpa PC, tanpa root, tanpa Termux.

## Baca Dulu Sebelum Mulai

Tiga hal ini wajib dipahami sebelum nyentuh tombol flash apa pun:

- **Satu arah.** Boot ROM chip KT02H20 itu nggak punya perintah baca, jadi firmware bawaan dongle **nggak bisa di-backup**. Sekali firmware JA11 masuk, nggak ada jalan balik ke firmware bawaan. Yang masih bisa ditimpa ulang cuma firmware JA11 itu sendiri atau image KT02H20B lain, misalnya buat downgrade versi JA11.
- **Pastikan chip dongle kamu emang KT02H20.** Satu listing penjual yang sama sering jualan banyak varian chip (CX31993, ALC5686, CS46L41, dan lain-lain) dalam kemasan yang mirip-mirip. Tutorial ini **cuma** buat varian KT02H20. Untungnya KT Flasher bakal ngecek ID chip dulu sebelum ngapus apa pun, dan berhenti sendiri dengan aman kalau chipnya bukan KT02H20B. Jadi selama langkahnya diikuti berurutan, dongle beda chip nggak bakal rusak, prosesnya cuma batal.
- **Risiko brick permanen kecil.** Boot ROM nggak pernah ditimpa dan header firmware ditulis paling akhir, jadi kalau tulisnya gagal di tengah, normalnya dongle cuma nyangkut di mode bootloader. Itu bisa dipulihkan, ada bagian Pemulihan di bawah.

Selama flash jalan: baterai HP usahakan cukup, kabel atau adapter OTG yang bagus, dan jangan sentuh atau cabut konektor sampai prosesnya selesai.

## Perangkat yang Didukung

Semua dongle berchip KTMicro KT02H20, contohnya:

- Dongle generik KT02H20 tanpa merek (yang saya pakai salah satunya)
- JCALLY JM12
- FiiO / JadeAudio JA11 itu sendiri (buat flash ulang atau downgrade firmware)

Cara ngenalinnya sebelum beli: penjual yang jujur biasanya nulis nama chip di deskripsi. Kalau dongle udah di tangan, langkah Probe di bawah bakal baca identitas USB-nya. Dongle KT02H20 mode normal kebaca dengan VID `31b2`, misalnya `31b2:0111`.

## Unduhan

Siapkan dua hal ini:

**1. Aplikasi KT Flasher.** Unduh APK versi terbarunya dari halaman rilis resmi. Versi terbaru pas artikel ini ditulis itu v1.3.1. Aplikasinya nggak nyertain firmware di dalamnya, jadi firmware tetap kamu unduh sendiri dari poin berikutnya.

<a class="tombol-unduh" href="https://github.com/craxid/kt-flasher/releases"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 21h16"/></svg>Unduh KT Flasher</a>

**2. Firmware resmi JadeAudio JA11 V2.2 dari FiiO.** Berkasnya berupa ZIP sekitar 9 MB dari server resmi FiiO. Ekstrak dulu, yang kita butuhkan cuma berkas `JadeAudio JA11_V2.2.bin` di dalam folder `Firmware`. Di dalam ZIP itu juga ada upgrade tool buat Windows dari FiiO, abaikan aja, kita nggak pakai itu. Data firmware yang benar: ukuran **67.312 byte**, **67 paket**, chip **KT02H20B**, CRC **0xcf975bc0**. Nanti langkah validasi bakal nampilin angka-angka ini, cocokkan ya. Kalau beda, berarti berkasmu salah atau rusak.

<a class="tombol-unduh" href="https://fiio-firmware.fiio.net/JA11/%E8%8B%B1%E6%96%87%E5%9B%BA%E4%BB%B6/JadeAudio%20JA11%20Firmware%20V2.2.zip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 21h16"/></svg>Unduh Firmware JA11 V2.2</a>

Buat verifikasi hasil di akhir, pasang juga aplikasi **FiiO Control** dari Play Store.

## Langkah Flash Pakai KT Flasher

Semua langkah keamanan udah built-in di aplikasinya: cek chip sebelum hapus, konfirmasi eksplisit sebelum nulis, dan header firmware ditulis paling akhir.

1. Pasang APK KT Flasher yang udah kamu unduh, terus colok dongle ke HP lewat OTG.
2. Buka KT Flasher, jalanin **Probe**. Android bakal minta izin akses USB, ketuk **Allow**. Dongle KT02H20 kamu harusnya kebaca di daftar (VID `31b2`).
3. Pilih berkas firmware `JadeAudio JA11_V2.2.bin` lewat pemilih berkas di aplikasi, terus jalanin **validasi image**. Pastikan hasilnya nampilin chip `KT02H20B`, ukuran 67.312 byte, 67 paket, CRC `0xcf975bc0`.
4. Jalanin **Dry run**. Tahap ini cuma simulasi, nggak ada data yang ditulis ke dongle. Pastikan rencana paketnya bersih tanpa error.
5. Jalanin **Flash**. Urutannya bakal kayak gini:
   - Aplikasi minta izin USB buat dongle mode normal (ketuk **Allow**), terus ngirim perintah masuk bootloader. Dongle bakal lepas dan muncul lagi sebagai perangkat baru `8888:cdc0`.
   - Android nampilin izin USB **kedua** buat perangkat bootloader itu. Ketuk **Allow** juga, jangan sampai kelewat.
   - Aplikasi ngelakuin handshake dan baca ID chip dari dongle. Kalau bukan `KT02H20B`, proses batal di sini sebelum ada yang dihapus.
   - Kalau cocok, muncul dialog konfirmasi hapus dan tulis. Baca baik-baik, terus konfirmasi.
   - 67 paket ditulis satu per satu pakai indikator progres. Di dongle saya, nulisnya kelar kurang dari dua detik. Jangan sentuh konektor selama tahap ini.
6. Sesudah muncul status selesai, cabut dongle terus colok lagi biar firmware barunya jalan.

Soal izin USB: izinnya emang muncul **dua kali** dan itu normal, soalnya dongle ganti identitas di tengah proses. Di KT Flasher v1.3.1 ke atas jumlahnya emang cuma dua. Kalau ada aplikasi lain yang memicu izin ketiga, biarin dulu dan selesaikan sesi flash-nya.

Satu lagi: kalau handshake gagal gara-gara dongle ketinggalan di mode bootloader dari percobaan sebelumnya, KT Flasher v1.2.1 ke atas bakal nawarin pemulihan terpandu cabut-colok. Ikutin aja arahannya. Cara itu udah terbukti berhasil di JM12 yang nyangkut persis di keadaan itu.

## Verifikasi Hasil

- Colok ulang dongle. Namanya sekarang kebaca sebagai **USB-Audio - JadeAudio JA11** (USB `2972:0102`).
- Putar lagu, pastikan suara keluar normal di kiri dan kanan.
- Tes mic pakai headset yang ada mic-nya, pastikan mic tetap jalan.
- Buka **FiiO Control**: dongle harusnya dikenali sebagai JadeAudio JA11 dan pengaturan kayak EQ / PEQ bisa diakses. Ini dia keuntungan utama firmware JA11 dibanding firmware bawaan dongle generik.

## Pemulihan Kalau Flash Gagal di Tengah

Jangan panik. Gagal tulis itu normalnya bikin dongle nyangkut di mode bootloader (`8888:cdc0`), soalnya boot ROM nggak pernah ditimpa dan image yang belum lengkap nggak bakal dicoba buat boot.

1. Cabut dongle, colok lagi. Langkah ini penting soalnya handshake bootloader cuma diterima sekali per sesi boot.
2. Jalanin **Probe** di KT Flasher, dongle bakal kebaca sebagai bootloader.
3. Ulangi proses flash dari awal pakai firmware yang sama sampai selesai.

## Masalah yang Mungkin Muncul

- **Dongle nggak kebaca pas Probe**: cek sambungan OTG, cabut colok dongle, pastikan izin USB dikasih. Jangan lanjut ke tahap berikutnya sebelum dongle kedeteksi di sini.
- **Izin USB kedua nggak muncul atau kelewat**: proses bakal berhenti nunggu. Cabut colok dongle dan ulangi flash dari awal.
- **Handshake gagal (`no handshake ack`)**: handshake sesi boot ini udah kepakai, biasanya gara-gara percobaan flash sebelumnya di sesi colok yang sama. Cabut colok dongle, terus coba lagi. Di KT Flasher v1.2.1 ke atas ada pemulihan terpandu buat keadaan ini, ikutin aja.
- **Chip nggak cocok (`chip does not match image`)**: chip dongle kamu bukan KT02H20B. Proses batal sebelum ngapus apa pun kok, dongle tetap bisa dipakai normal. Tapi jangan dipaksain flash firmware ini ya.
- **Tulis gagal di paket tertentu (`write failed at packet N/M`)**: cabut colok, terus flash ulang dari awal sesuai bagian Pemulihan.

## Kredit dan Penutup

KT Flasher adalah aplikasi buatan CraXID Project, porting Android dari alat flash hasil reverse engineering updater resmi KTMicro oleh txtsamu dan dragonzords (berlisensi MIT). Kode sumber dan rilisnya ada di [repo KT Flasher](https://github.com/craxid/kt-flasher). Firmware JA11 adalah milik FiiO / JadeAudio dan tombol unduh di atas mengarah ke tautan resmi dari server FiiO.

Saya nggak berafiliasi sama FiiO, JadeAudio, JCALLY, maupun KTMicro. Risiko flashing ditanggung sendiri, tapi selama chip dongle kamu beneran KT02H20 dan langkahnya diikuti berurutan, prosesnya udah terbukti aman dan bisa dipulihkan. Selamat ngoprek.
