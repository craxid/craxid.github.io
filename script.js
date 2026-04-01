const GITHUB_USERNAME = 'craxid';

document.addEventListener('DOMContentLoaded', () => {
    // Set Tahun Otomatis
    document.getElementById('year').textContent = new Date().getFullYear();

    // Dark Mode Logic
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    const updateIcon = (t) => themeIcon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon(next);
    });

    loadTopProjects();
});

async function loadTopProjects() {
    const container = document.getElementById('project-container');
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=50`);
        const repos = await res.json();
        const topThree = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);

        container.innerHTML = topThree.map(repo => `
            <a href="${repo.html_url}" target="_blank" class="project-card">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'Proyek pengembangan sistem web modern.'}</p>
                <div style="margin-top:15px; font-size:0.85rem; display:flex; gap:12px;">
                    <span><i class="fas fa-star" style="color:#ffb300"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                </div>
            </a>
        `).join('');
    } catch (e) {
        container.innerHTML = '<p>Gagal memuat data.</p>';
    }
}
