// Tema gelap AMOLED
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Tahun dinamis
document.getElementById("year").textContent = new Date().getFullYear();

// Fetch top 3 repositori GitHub berdasarkan bintang
async function loadRepos() {
  const response = await fetch("https://api.github.com/users/craxid/repos?sort=updated");
  const repos = await response.json();
  const sorted = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);

  const container = document.getElementById("repo-list");
  container.innerHTML = "";
  sorted.forEach(repo => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
      <p>${repo.description || "Tidak ada deskripsi."}</p>
      <p>⭐ ${repo.stargazers_count}</p>
    `;
    container.appendChild(div);
  });
}

loadRepos();
