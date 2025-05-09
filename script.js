// File ini akan berisi kode JavaScript untuk website Sensei
// Misalnya, mengambil data repositori dari GitHub API dan menampilkannya

document.addEventListener('DOMContentLoaded', () => {
    const reposListElement = document.getElementById('repositories-list');
    const githubUsername = 'craxid'; // Ganti dengan username GitHub Sensei

    // Fungsi untuk mengambil data repositori dari GitHub API
    async function fetchRepositories(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stargazers_count&direction=desc`);
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch repositories:", error);
            reposListElement.innerHTML = `<p class="text-center text-red-500">Failed to load repositories. Please try again later.</p>`;
            return [];
        }
    }

    // Fungsi untuk menampilkan repositori di halaman
    function displayRepositories(repos) {
        if (repos.length === 0) {
            reposListElement.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400">No repositories found or failed to load.</p>`;
            return;
        }

        reposListElement.innerHTML = ''; // Bersihkan konten "Loading..."

        repos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.classList.add('p-6', 'rounded-xl', 'neumo-element'); // Tambahkan class Tailwind dan Neumorphism

            repoElement.innerHTML = `
                <h3 class="text-xl font-semibold mb-2">${repo.name}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-3">${repo.description || 'No description available.'}</p>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <!-- Star Icon -->
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                    <span>${repo.stargazers_count}</span>
                </div>
                 <a href="${repo.html_url}" class="text-blue-600 dark:text-blue-400 mt-3 inline-block" target="_blank">View on GitHub</a>
            `;
            reposListElement.appendChild(repoElement);
        });
    }

    // Panggil fungsi untuk mengambil dan menampilkan repositori saat halaman selesai dimuat
    fetchRepositories(githubUsername)
        .then(repos => {
            // Repositori sudah terurut by stargazers_count&direction=desc dari API
            displayRepositories(repos);
        });
});
