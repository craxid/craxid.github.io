const root = document.documentElement;
const body = document.body;

root.style.setProperty("--accent", CONFIG.accentColor);

document.title = `${CONFIG.webName} - Portfolio Developer`;

document.querySelector('meta[name="description"]').content = CONFIG.seoDescription;
document.querySelector('meta[name="keywords"]').content = CONFIG.keywords;
document.querySelector('meta[name="author"]').content = CONFIG.webName;
document.querySelector('meta[name="theme-color"]').content = CONFIG.accentColor;

document.querySelector('link[rel="canonical"]').href = CONFIG.siteUrl;
document.querySelector('link[rel="icon"]').href = CONFIG.profileImage;

document.querySelector('meta[property="og:title"]').content = CONFIG.webName;
document.querySelector('meta[property="og:description"]').content = CONFIG.seoDescription;
document.querySelector('meta[property="og:image"]').content = CONFIG.profileImage;
document.querySelector('meta[property="og:url"]').content = CONFIG.siteUrl;

document.querySelector('meta[name="twitter:title"]').content = CONFIG.webName;
document.querySelector('meta[name="twitter:description"]').content = CONFIG.seoDescription;
document.querySelector('meta[name="twitter:image"]').content = CONFIG.profileImage;

document.getElementById("profileImage").src = CONFIG.profileImage;
document.getElementById("webName").textContent = CONFIG.webName;
document.getElementById("description").textContent = CONFIG.description;
document.getElementById("whatsappBtn").href = CONFIG.whatsappUrl;
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("footerName").textContent = CONFIG.webName;

document.getElementById("whatsappBtn").classList.add("liquid-glass");

document.getElementById("whatsappBtn").innerHTML = `
  <i class="fa-brands fa-whatsapp"></i>
  <span>Gabung WhatsApp</span>
`;

const schema = document.createElement("script");
schema.type = "application/ld+json";
schema.textContent = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: CONFIG.webName,
  url: CONFIG.siteUrl,
  image: CONFIG.profileImage,
  sameAs: [`https://github.com/${CONFIG.githubUsername}`],
  jobTitle: "Web & Bot Developer",
});
document.body.appendChild(schema);

const themeToggle = document.getElementById("themeToggle");

themeToggle.classList.add("liquid-glass");

const moonIcon = `<i class="fa-solid fa-moon"></i>`;
const sunIcon = `<i class="fa-solid fa-sun"></i>`;

themeToggle.innerHTML = moonIcon;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.innerHTML = sunIcon;
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  const isDark = body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
});

const icons = {
  JavaScript: "fa-brands fa-js",
  CSS: "fa-brands fa-css3-alt",
  "REST API": "fa-solid fa-cloud",
  GitHub: "fa-brands fa-github",
  "Node.js": "fa-brands fa-node-js",
  "Bot Development": "fa-solid fa-robot",
  Render: "fa-solid fa-cube",
  React: "fa-brands fa-react",
  HTML: "fa-brands fa-html5",
  Vercel: "fa-solid fa-triangle-exclamation",
};

function renderTechStack() {
  const container = document.getElementById("techStack");
  const shuffled = [...CONFIG.techStacks].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 7);

  container.innerHTML = selected
    .map((tech) => {
      const icon = icons[tech] || "fa-solid fa-code";

      return `
        <span class="liquid-glass">
          <i class="${icon}"></i>
          ${tech}
        </span>
      `;
    })
    .join("");
}

async function loadProjects() {
  const container = document.getElementById("projects");

  try {
    container.innerHTML = `<p class="description">Memuat project GitHub...</p>`;

    const response = await fetch(
      `https://api.github.com/users/${CONFIG.githubUsername}/repos?per_page=100`
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data GitHub.");
    }

    const repos = await response.json();

    const sortedRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => {
        const scoreA = a.stargazers_count + a.forks_count;
        const scoreB = b.stargazers_count + b.forks_count;

        return scoreB - scoreA;
      })
      .slice(0, CONFIG.maxProjects);

    if (!sortedRepos.length) {
      container.innerHTML = `<p class="description">Belum ada repository publik.</p>`;
      return;
    }

    container.innerHTML = sortedRepos
      .map(
        (repo) => `
          <article class="project-card liquid-glass">
            <a href="${repo.html_url}" target="_blank" rel="noopener">
              ${repo.name}
            </a>

            <p>${repo.description || "Tidak ada deskripsi repository."}</p>

            <div class="project-meta">
              <span>
                <i class="fa-solid fa-star"></i>
                ${repo.stargazers_count}
              </span>

              <span>
                <i class="fa-solid fa-code-fork"></i>
                ${repo.forks_count}
              </span>

              <span>
                <i class="fa-solid fa-code"></i>
                ${repo.language || "Unknown"}
              </span>
            </div>
          </article>
        `
      )
      .join("");
  } catch (error) {
    container.innerHTML = `<p class="description">Project GitHub gagal dimuat.</p>`;
  }
}

renderTechStack();
loadProjects();
