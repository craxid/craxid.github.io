// script.js

document.getElementById('generate-btn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const linkedin = document.getElementById('linkedin').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;

    const previewContent = document.getElementById('preview-content');

    // Membuat konten CV
    let cvHtml = `<h3>${name || 'Nama Anda'}</h3>`;

    if (email || phone || linkedin) {
        cvHtml += '<p>';
        if (email) cvHtml += `Email: ${email}<br>`;
        if (phone) cvHtml += `Telepon: ${phone}<br>`;
        if (linkedin) cvHtml += `LinkedIn: <a href="${linkedin}" target="_blank">${linkedin}</a>`;
        cvHtml += '</p>';
    }

    if (experience) {
        cvHtml += '<h4>Pengalaman</h4>';
        cvHtml += `<p>${experience}</p>`; // Menggunakan <p> untuk menjaga format baris baru
    }

    if (education) {
        cvHtml += '<h4>Pendidikan</h4>';
        cvHtml += `<p>${education}</p>`; // Menggunakan <p> untuk menjaga format baris baru
    }

    if (!name && !email && !phone && !linkedin && !experience && !education) {
         cvHtml = '<p>Sensei, belum ada data yang diisi! >_<</p>';
    }


    previewContent.innerHTML = cvHtml;
});

document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('linkedin').value = '';
    document.getElementById('experience').value = '';
    document.getElementById('education').value = '';

    document.getElementById('preview-content').innerHTML = '<p>Tekan \'Buat CV!\' untuk melihat hasilnya! (^.^)</p>';
});
