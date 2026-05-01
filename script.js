const GITHUB_USERNAME = 'craxid';

document.addEventListener('DOMContentLoaded', () => {
    // Set Tahun Footer
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Theme Logic
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    const html = document.documentElement;

    const updateUI = (theme) => {
        html.setAttribute('data-theme', theme);
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    updateUI(savedTheme);

    themeBtn.addEventListener('click', () => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        updateUI(isDark ? 'light' : 'dark');
    });

    loadGitHubProjects();
});

async function loadGitHubProjects() {
    const container = document.getElementById('project-container');
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`);
        const data = await res.json();

        // Sort by Stars, take top 3
        const topRepos = data
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 3);

        container.innerHTML = '';
        topRepos.forEach(repo => {
            const card = `
                <a href="${repo.html_url}" target="_blank" class="project-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Proyek open-source berkualitas yang dikembangkan dengan dedikasi.'}</p>
                    <div style="display:flex; gap:15px; font-size:0.85rem; font-weight:700; opacity:0.8;">
                        <span><i class="fas fa-star" style="color:#ffb300"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        <span style="margin-left:auto; color:var(--accent)">${repo.language || 'Code'}</span>
                    </div>
                </a>
            `;
            container.innerHTML += card;
        });
    } catch (err) {
        container.innerHTML = '<p>Gagal memuat repositori.</p>';
    }
}
