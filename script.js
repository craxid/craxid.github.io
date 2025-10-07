const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeIcon.classList.toggle('text-yellow-500');
});

fetch('https:                                                                                 
  .then(response => response.json())
  .then(data => {
    const portfolioContainer = document.querySelector('//api.github.com/users/craxid/repos?sort=stargazers_count&direction=desc')
  .then(response => response.json())
  .then(data => {
    const portfolioContainer = document.querySelector('#portfolio .grid');
    data.slice(0, 3).forEach(repo => {
      const repoElement = document.createElement('div');
      repoElement.classList.add('bg-white', 'dark:bg-gray-800', 'p-4', 'rounded', 'shadow-md');
      repoElement.innerHTML = `
        <h3 class="text-lg font-bold mb-2">${repo.name}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">${repo.description}</p>
        <div class="flex flex-wrap mb-4">
          ${repo.topics.map(topic => `<span class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 py-1 px-2 rounded-full text-xs mr-2 mb-2">${topic}</span>`).join('')}
        </div>
        <a href="${repo.html_url}" target="_blank" class="text-blue-500 hover:text-blue-700 transition duration-300">View on GitHub</a>
      `;
      portfolioContainer.appendChild(repoElement);
    });
  })
  .catch(error => console.error(error));