// Toggle Tema
document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Footer Dinamis
document.getElementById('year').textContent = new Date().getFullYear();

// Ambil Proyek GitHub
const username = "YOUR_GITHUB_USERNAME"; // Ganti dengan username kamu
fetch(`https://api.github.com/users/${username}/repos`)
.then(res => res.json())
.then(data => {
    const sorted = data.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);
    const container = document.getElementById('projects');
    sorted.forEach(repo => {
      const card = document.createElement('div');
      card.className = "project-card";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "Tidak ada deskripsi."}</p>
        <p>⭐️ ${repo.stargazers_count}</p>
        <a href="${repo.html_url}" target="_blank">Lihat di GitHub</a>
      `;
      container.appendChild(card);
});
});