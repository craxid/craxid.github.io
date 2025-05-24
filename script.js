// File ini akan berisi kode JavaScript untuk website Sensei
// Mengambil data repositori dari GitHub API, mengurutkan, dan menampilkannya
// Ditambah logika Mode Gelap/Terang

document.addEventListener('DOMContentLoaded', () => {
    const reposListElement = document.getElementById('repositories-list');
    const githubUsername = 'craxid'; // Ganti dengan username GitHub Sensei
    const numberOfReposToShow = 3; // Tetap tampilkan 3 repo teratas

    // --- Logika Mode Gelap/Terang ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const localStorageKey = 'themePreference'; // Kunci untuk localStorage

    // Fungsi untuk menerapkan tema
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
        // Icon visibility is handled by CSS based on body.dark class
    }

    // Fungsi untuk mengganti tema
    function toggleTheme() {
        const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem(localStorageKey, newTheme); // Simpan preferensi di localStorage
    }

    // Cek preferensi tema saat halaman dimuat
    const savedTheme = localStorage.getItem(localStorageKey);
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Jika belum ada preferensi, cek preferensi sistem
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDarkMode ? 'dark' : 'light');
    }

    // Tambahkan event listener ke tombol toggle
    themeToggleBtn.addEventListener('click', toggleTheme);

    // --- Logika Ambil Repositori GitHub (Kode sebelumnya) ---

    // Fungsi untuk mengambil data repositori dari GitHub API
    async function fetchRepositories(username) {
        try {
            // Mengambil semua repositori tanpa parameter sorting dari API
            const response = await fetch(`https://api.github.com/users/${username}/repos`);

            if (!response.ok) {
                 if (response.status === 403) {
                     throw new Error(`GitHub API error: Rate limit exceeded or access forbidden.`);
                }
                 if (response.status === 404) {
                     throw new Error(`GitHub API error: User "${username}" not found.`);
                }
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            console.log("Fetched repositories (unsorted):", data); // Log data yang belum diurutkan

            return data; // Kembalikan semua data yang didapat
        } catch (error) {
            console.error("Failed to fetch repositories:", error);
            reposListElement.innerHTML = `<p class="text-center text-red-500">Failed to load repositories: ${error.message}</p>`;
            return [];
        }
    }

    // Fungsi untuk menampilkan repositori di halaman
    function displayRepositories(repos) {
        if (!repos || repos.length === 0) {
            reposListElement.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400">No repositories found or failed to load.</p>`;
            return;
        }

        // Mengurutkan repositori berdasarkan jumlah bintang (descending)
        const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

        // Ambil hanya sejumlah repo yang diinginkan dari daftar yang sudah diurutkan
        const topRepos = sortedRepos.slice(0, numberOfReposToShow);

        reposListElement.innerHTML = ''; // Bersihkan konten "Loading..."

        topRepos.forEach(repo => { // Loop hanya untuk repo teratas yang sudah diurutkan
            const repoElement = document.createElement('div');
            repoElement.classList.add('p-6', 'rounded-xl', 'neumo-element', 'transition', 'duration-300', 'hover:shadow-xl');

            repoElement.innerHTML = `
                <h3 class="text-xl font-semibold mb-2">${repo.name}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-3">${repo.description || 'No description available.'}</p>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <!-- Star Icon -->
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                    <span>${repo.stargazers_count} stars</span>
                    <!-- Fork Icon (using Font Awesome) -->
                    <i class="fas fa-code-branch w-4 h-4 ml-4 mr-1"></i>
                    <span>${repo.forks_count} forks</span>
                </div>
                 <a href="${repo.html_url}" class="text-blue-600 dark:text-blue-400 hover:underline mt-3 inline-block" target="_blank">View on GitHub</a>
            `;
            reposListElement.appendChild(repoElement);
        });
    }

    // Panggil fungsi untuk mengambil data, lalu urutkan dan tampilkan
    fetchRepositories(githubUsername)
        .then(repos => {
            displayRepositories(repos); // Fungsi ini sekarang sudah mengurutkan dan mengambil 3 teratas
        });
});

// Sensei bisa tambahkan kode JavaScript lainnya di sini
const yearSpan = document.getElementById('currentYear');
        const currentYear = new Date().getFullYear();
        if (yearSpan) {
            yearSpan.textContent = currentYear;
        }