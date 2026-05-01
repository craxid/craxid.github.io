const GITHUB_USERNAME = 'craxid';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    loadGitHubProjects();
});

async function loadGitHubProjects() {
    const container = document.getElementById('project-container');
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`);
        const repos = await response.json();

        // Sort by Stars and take top 3
        const topRepos = repos
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 3);

        container.innerHTML = '';
        topRepos.forEach(repo => {
            container.innerHTML += `
                <a href="${repo.html_url}" target="_blank" class="project-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Proyek pengembangan sistem yang dibangun dengan dedikasi tinggi.'}</p>
                    <div class="project-stats">
                        <div class="stats-left">
                            <span><i class="fas fa-star" style="color:#ffb300"></i> ${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        </div>
                        <div class="stats-right">
                            <span class="repo-language">${repo.language || 'Code'}</span>
                        </div>
                    </div>
                </a>
            `;
        });
    } catch (e) {
        container.innerHTML = '<p>Gagal memuat proyek GitHub.</p>';
    }
}
