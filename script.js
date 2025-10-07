// Toggle Tema Gelap
document.getElementById('themeToggle').addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});

// Footer Dinamis
document.getElementById('year').textContent = new Date().getFullYear();

// Ambil Proyek GitHub
const username = "craxid"; // Ganti dengan username kamu
fetch(`https://api.github.com/users/${username}/repos`)
.then(res => res.json())
.then(data => {
    const sorted = data.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);
    const container = document.getElementById('projects');
    sorted.forEach(repo => {
      const card = document.createElement('div');
      card.className = "p-4 border rounded shadow bg-white dark:bg-gray-800";
      card.innerHTML = `
        <h3 class="text-lg font-bold">${repo.name}</h3>
        <p>${repo.description || "Tidak ada deskripsi."}</p>
        <p>⭐️ ${repo.stargazers_count}</p>
        <a href="${repo.html_url}" target="_blank" class="text-blue-500 underline">Lihat di GitHub</a>
      `;
      container.appendChild(card);
});
});