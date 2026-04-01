const GITHUB_USERNAME = 'craxid';

// SVG Ikon Bintang (Di-inline untuk performa)
const ICON_STAR = `<svg viewbox="0 0 576 512" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>`;

// SVG Ikon Garpu/Fork (Di-inline untuk performa)
const ICON_FORK = `<svg viewbox="0 0 448 512" width="12" height="14" fill="currentColor" aria-hidden="true"><path d="M439.3 7.1c-9.4-9.4-24.6-9.4-33.9 0L224 188.7 42.6 7.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l181.4 181.4v246.6c0 13.3 10.7 24 24 24s24-10.7 24-24V222.4L439.3 41c9.4-9.4 9.4-24.6 0-33.9z"/></svg>`;

document.addEventListener('DOMContentLoaded', () => {
    // Set tahun otomatis di footer
    const yearElement = document.getElementById('year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        // Pastikan transisi ikon mulus
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', theme);
    };

    // Load preferensi tema dari localStorage atau default ke light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(isDark ? 'light' : 'dark');
    });

    loadRepos();
});

async function loadRepos() {
    const container = document.getElementById('project-container');
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`);
        if (!res.ok) throw new Error('API limit');
        
        const data = await res.json();
        
        // Urutkan berdasarkan Stargazers terbanyak, ambil 3 teratas
        const topThree = data.sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0,3);
        
        // Hapus teks 'Memuat...'
        container.innerHTML = ''; 

        container.innerHTML = topThree.map(repo => `
            <a href="${repo.html_url}" target="_blank" class="project-card" rel="noopener noreferrer">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'Proyek pengembangan sistem modern.'}</p>
                <div style="margin-top:20px; font-size:0.85rem; display:flex; gap:15px; opacity:0.8; align-items:center;">
                    <span style="display:flex; align-items:center; gap:5px; color:#ffb300;">
                        ${ICON_STAR} ${repo.stargazers_count}
                    </span>
                    <span style="display:flex; align-items:center; gap:5px;">
                        ${ICON_FORK} ${repo.forks_count}
                    </span>
                </div>
            </a>
        `).join('');
    } catch (e) {
        container.innerHTML = '<p>Gagal memuat data proyek. Cek koneksi atau limit API GitHub.</p>';
    }
}
