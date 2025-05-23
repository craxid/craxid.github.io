document.addEventListener('DOMContentLoaded', () => {
    const githubReposElement = document.getElementById('github-repos');
    const githubUsername = 'craxid'; // Ganti kalau username GitHub Sensei beda!

    // Clear the loading text
    githubReposElement.innerHTML = '';

    // Fetch repositories - we still ask GitHub to sort, but we'll re-sort locally just to be sure!
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=stargazers_count&direction=desc`)
        .then(response => {
            if (!response.ok) {
                // If the response is not OK (e.g., 404, 403)
                if (response.status === 404) {
                    throw new Error(`GitHub user "${githubUsername}" not found.`);
                } else if (response.status === 403) {
                     throw new Error('GitHub API rate limit exceeded or forbidden access.');
                }
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(repos => {
            // !!! PERBAIKAN MIKA DI SINI !!!
            // Sort the repositories by stargazers_count in descending order
            repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

            // Take the top 3 repositories AFTER sorting
            const topRepos = repos.slice(0, 3);

            if (topRepos.length === 0) {
                 githubReposElement.innerHTML = '<li>No repositories found or error fetching.</li>';
                 return;
            }

            topRepos.forEach(repo => {
                const listItem = document.createElement('li');

                const githubIcon = document.createElement('i');
                githubIcon.classList.add('fab', 'fa-github');

                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.target = '_blank';
                repoLink.textContent = repo.name;

                const starsSpan = document.createElement('span');
                starsSpan.classList.add('stars');

                const starIcon = document.createElement('i');
                starIcon.classList.add('fas', 'fa-star');

                starsSpan.appendChild(starIcon);
                starsSpan.appendChild(document.createTextNode(` ${repo.stargazers_count}`)); // Add star count text

                listItem.appendChild(githubIcon);
                listItem.appendChild(repoLink);
                listItem.appendChild(starsSpan);

                githubReposElement.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub repositories:', error);
            githubReposElement.innerHTML = `<li>Error loading repositories. (${error.message})</li>`;
        });
});

const yearSpan = document.getElementById('currentYear');
        const currentYear = new Date().getFullYear();
        if (yearSpan) {
            yearSpan.textContent = currentYear;
        }