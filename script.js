const GITHUB_USERNAME = 'craxid';
const REPO_NAME = 'craxid.github.io'; // Sesuaikan dengan nama repo kamu

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tahun Footer
    const yr = document.getElementById('year');
    if(yr) yr.textContent = new Date().getFullYear();

    // 2. Dark Mode Logic
    const btn = document.getElementById('theme-toggle');
    const applyTheme = (t) => {
        document.documentElement.setAttribute('data-theme', t);
        if(btn.querySelector('i')) {
            btn.querySelector('i').className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };
    const saved = localStorage.getItem('theme') || 'light';
    applyTheme(saved);

    btn.addEventListener('click', () => {
        const now = document.documentElement.getAttribute('data-theme');
        const next = now === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });

    // 3. Router Logika (Cek halaman mana yang aktif)
    if(document.getElementById('project-container')) {
        loadRepos(); // Jika di index.html
    }
    
    if(document.getElementById('blog-list-container')) {
        autoRenderBlog(); // Jika di blog.html
    }
});

// Load Repo GitHub untuk Portofolio
async function loadRepos() {
    const container = document.getElementById('project-container');
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=3`);
        const data = await res.json();
        container.innerHTML = data.map(r => `
            <a href="${r.html_url}" class="project-card" target="_blank" style="text-decoration:none; color:inherit;">
                <h3 style="color:var(--accent)">${r.name}</h3>
                <p>${r.description || 'Project Fullstack Engineer'}</p>
                <div style="font-size:0.8rem; margin-top:10px;">⭐ ${r.stargazers_count} | 🍴 ${r.forks_count}</div>
            </a>
        `).join('');
    } catch (e) { container.innerHTML = "Gagal memuat proyek."; }
}

// OTOMATIS: Ambil daftar file .md dari GitHub
async function autoRenderBlog() {
    const container = document.getElementById('blog-list-container');
    try {
        // Fetch daftar file di folder /content/
        const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/posts`);
        const files = await res.json();

        // Ambil hanya file .md
        const mdFiles = files.filter(f => f.name.endsWith('.md'));

        if(mdFiles.length === 0) {
            container.innerHTML = "<p>Belum ada tulisan di folder content/.</p>";
            return;
        }

        container.innerHTML = mdFiles.map(file => {
            const slug = file.name.replace('.md', '');
            const displayTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            return `
                <article class="project-card">
                    <span style="font-size:0.75rem; color:var(--accent); font-weight:600;">ARTIKEL</span>
                    <h3>${displayTitle}</h3>
                    <p>Pembahasan mengenai ${displayTitle}. Klik untuk membaca selengkapnya.</p>
                    <a href="post.html?file=${slug}" style="text-decoration:none; font-weight:600; color:var(--accent);">Baca Selengkapnya →</a>
                </article>
            `;
        }).join('');
    } catch (e) {
        container.innerHTML = "<p>Gagal mengambil daftar artikel. Pastikan folder 'content' ada di repo kamu.</p>";
    }
}
