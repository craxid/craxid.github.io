const GITHUB_USERNAME = 'craxid';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');

    const updateIcon = (theme) => {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon(next);
    });

    loadTopProjects();
});

async function loadTopProjects() {
    const container = document.getElementById('project-container');
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        let repos = await response.json();

        // URUTKAN BERDASARKAN STAR TERBANYAK
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

        // AMBIL MAKSIMAL 3 SAJA
        const topThree = repos.slice(0, 3);

        container.innerHTML = '';
        topThree.forEach(repo => {
            container.innerHTML += `
                <a href="${repo.html_url}" target="_blank" class="project-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Proyek pengembangan sistem yang dibangun dengan dedikasi tinggi.'}</p>
                    <div style="margin-top: 20px; font-weight: 700; font-size: 0.9rem; display: flex; gap: 15px; opacity: 0.8;">
                        <span><i class="fas fa-star" style="color:#ffb300"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    </div>
                </a>
            `;
        });
    } catch (e) {
        container.innerHTML = '<p>Gagal memuat proyek.</p>';
    }
}