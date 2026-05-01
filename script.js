const GITHUB_USERNAME = 'craxid';

// Mapping sederhana untuk ikon bahasa pemrograman
const langIcons = {
    'JavaScript': '<i class="fab fa-js" style="color: #f7df1e;"></i>',
    'PHP': '<i class="fab fa-php" style="color: #777bb4;"></i>',
    'TypeScript': '<i class="fab fa-js-square" style="color: #3178c6;"></i>',
    'Python': '<i class="fab fa-python" style="color: #3776ab;"></i>',
    'HTML': '<i class="fab fa-html5" style="color: #e34f26;"></i>',
    'CSS': '<i class="fab fa-css3-alt" style="color: #1572b6;"></i>'
};

async function loadTopProjects() {
    const container = document.getElementById('project-container');
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        let repos = await response.json();
        
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        const topThree = repos.slice(0, 3);

        container.innerHTML = '';
        topThree.forEach(repo => {
            const langIcon = langIcons[repo.language] || '<i class="fas fa-code"></i>';
            
            container.innerHTML += `
                <a href="${repo.html_url}" target="_blank" class="project-card">
                    <h3>${repo.name}</h3>
                    <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 40px;">${repo.description || 'Proyek pengembangan sistem yang dibangun dengan dedikasi tinggi.'}</p>
                    
                    <div class="card-stats">
                        <span><i class="fas fa-star" style="color:#ffb300"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    </div>

                    <div class="card-language">
                        ${langIcon} <span>${repo.language || 'Code'}</span>
                    </div>
                </a>
            `;
        });
    } catch (e) {
        container.innerHTML = '<p>Gagal memuat proyek.</p>';
    }
}
