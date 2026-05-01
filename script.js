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

    loadRepos();
});

async function loadRepos() {
    const container = document.getElementById('project-container');
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=3`);
        const repos = await res.json();
        container.innerHTML = '';
        repos.forEach(repo => {
            container.innerHTML += `
                <a href="${repo.html_url}" target="_blank" class="project-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                </a>
            `;
        });
    } catch (e) { container.innerHTML = '<p>Error loading projects</p>'; }
}
