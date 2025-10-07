const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

fetch('https:                                                                                 
  .then(response => response.json())
  .then(data => {
    const portfolioGrid = document.querySelector('//api.github.com/users/your-username/repos?sort=stargazers_count&direction=desc')
  .then(response => response.json())
  .then(data => {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    data.slice(0, 3).forEach(repo => {
      const repoElement = document.createElement('div');
      repoElement.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description}</p>
        <p>Stars: ${repo.stargazers_count}</p>
      `;
      portfolioGrid.appendChild(repoElement);
    });
  })
  .catch(error => console.error(error));