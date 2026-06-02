const root = document.documentElement;
const body = document.body;

root.style.setProperty("--accent", CONFIG.accentColor);

/* =========================
   HELPERS
========================= */

function setContent(selector, value, prop = "textContent") {
  const element = document.querySelector(selector);

  if (element) {
    element[prop] = value;
  }
}

function setAttr(selector, attr, value) {
  const element = document.querySelector(selector);

  if (element && value) {
    element.setAttribute(attr, value);
  }
}

/* =========================
   PAGE TITLE
========================= */

const currentPath = window.location.pathname;

if (currentPath.includes("/bot")) {
  document.title = `Bot - ${CONFIG.webName}`;
} else if (currentPath.includes("404")) {
  document.title = `404 - ${CONFIG.webName}`;
} else {
  document.title = `${CONFIG.webName} - Portfolio Developer`;
}

/* =========================
   META SEO
========================= */

setContent(
  'meta[name="description"]',
  CONFIG.seoDescription,
  "content"
);

setContent(
  'meta[name="keywords"]',
  CONFIG.keywords,
  "content"
);

setContent(
  'meta[name="author"]',
  CONFIG.webName,
  "content"
);

setContent(
  'meta[name="theme-color"]',
  CONFIG.accentColor,
  "content"
);

setAttr(
  'link[rel="canonical"]',
  "href",
  CONFIG.siteUrl
);

setAttr(
  'link[rel="icon"]',
  "href",
  CONFIG.profileImage
);

setContent(
  'meta[property="og:title"]',
  CONFIG.webName,
  "content"
);

setContent(
  'meta[property="og:description"]',
  CONFIG.seoDescription,
  "content"
);

setContent(
  'meta[property="og:image"]',
  CONFIG.profileImage,
  "content"
);

setContent(
  'meta[property="og:url"]',
  CONFIG.siteUrl,
  "content"
);

setContent(
  'meta[name="twitter:title"]',
  CONFIG.webName,
  "content"
);

setContent(
  'meta[name="twitter:description"]',
  CONFIG.seoDescription,
  "content"
);

setContent(
  'meta[name="twitter:image"]',
  CONFIG.profileImage,
  "content"
);

/* =========================
   GLOBAL CONTENT
========================= */

setAttr(
  "#profileImage",
  "src",
  CONFIG.profileImage
);

setContent(
  "#webName",
  CONFIG.webName
);

setContent(
  "#description",
  CONFIG.description
);

setContent(
  "#year",
  new Date().getFullYear()
);

setContent(
  "#footerName",
  CONFIG.webName
);

/* =========================
   ANTI COPY
========================= */

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

document.addEventListener("keydown", (e) => {
  if (
    (e.ctrlKey &&
      ["c", "u", "s", "a"].includes(e.key.toLowerCase())) ||
    e.key === "F12"
  ) {
    e.preventDefault();
  }
});

/* =========================
   WHATSAPP BUTTON
   Dipakai di halaman utama
========================= */

const whatsappBtn = document.getElementById("whatsappBtn");

if (whatsappBtn) {
  whatsappBtn.href = CONFIG.whatsappUrl;
  whatsappBtn.classList.add("liquid-glass");

  whatsappBtn.innerHTML = `
    <i class="fa-brands fa-whatsapp"></i>
    <span>WhatsApp Bot</span>
  `;
}

/* =========================
   BOT GROUP BUTTON
   Dipakai di halaman /bot/
========================= */

const botGroupBtn = document.getElementById("botGroupBtn");

if (botGroupBtn) {
  botGroupBtn.href = CONFIG.botGroupUrl;
  botGroupBtn.classList.add("liquid-glass");
}

/* =========================
   GLOBAL SECONDARY BUTTONS
========================= */

document.querySelectorAll(".secondary-btn").forEach((button) => {
  button.classList.add("liquid-glass");
});

/* =========================
   SCHEMA SEO
========================= */

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

/* =========================
   THEME
========================= */

const themeToggle = document.getElementById("themeToggle");

const moonIcon = `<i class="fa-solid fa-moon"></i>`;
const sunIcon = `<i class="fa-solid fa-sun"></i>`;

if (themeToggle) {
  themeToggle.classList.add("liquid-glass");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.innerHTML = sunIcon;
  } else {
    themeToggle.innerHTML = moonIcon;
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
  });
}

/* =========================
   TECH STACK ICONS
========================= */

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

/* =========================
   TECH STACK
========================= */

function renderTechStack() {
  const container = document.getElementById("techStack");

  if (!container) {
    return;
  }

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

/* =========================
   GITHUB PROJECTS
========================= */

async function loadProjects() {
  const container = document.getElementById("projects");

  if (!container) {
    return;
  }

  try {
    container.innerHTML = `
      <p class="description">
        Memuat project GitHub...
      </p>
    `;

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
      container.innerHTML = `
        <p class="description">
          Belum ada repository publik.
        </p>
      `;
      return;
    }

    container.innerHTML = sortedRepos
      .map(
        (repo) => `
          <article class="project-card liquid-glass">
            <a
              href="${repo.html_url}"
              target="_blank"
              rel="noopener"
            >
              ${repo.name}
            </a>

            <p>
              ${repo.description || "Tidak ada deskripsi repository."}
            </p>

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
    container.innerHTML = `
      <p class="description">
        Project GitHub gagal dimuat.
      </p>
    `;
  }
}

/* =========================
   INIT
========================= */

renderTechStack();
loadProjects();

/* =========================
   PWA SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch(() => {
        console.warn("Service worker registration failed.");
      });
  });
}

/* =========================
   GDRIVE UPLOADER LOGIC
========================= */
const uploaderInput = document.getElementById('file');
const uploaderLabel = document.getElementById('fileLabel');
const uploaderBtn = document.getElementById('uploadBtn');
const uploaderStatus = document.getElementById('status');

// Cek apakah user sedang berada di halaman uploader
if (uploaderInput && uploaderLabel && uploaderBtn && uploaderStatus) {
  
  // 1. Animasi saat file dipilih
  uploaderInput.addEventListener('change', () => {
    if (uploaderInput.files.length > 0) {
      const fileName = uploaderInput.files[0].name;
      uploaderLabel.innerHTML = `<i class="fa-solid fa-file-circle-check icon-upload"></i><span style="font-weight: 600; color: var(--text);">${fileName}</span>`;
      uploaderLabel.style.borderColor = 'var(--accent)';
      uploaderLabel.style.background = 'var(--glass-strong)';
    } else {
      uploaderLabel.innerHTML = `<i class="fa-solid fa-cloud-arrow-up icon-upload"></i><span style="font-weight: 500;">Ketuk untuk memilih file</span>`;
      uploaderLabel.style.borderColor = 'color-mix(in srgb, var(--accent) 50%, transparent)';
      uploaderLabel.style.background = 'transparent';
    }
  });

  // 2. Eksekusi API GAS saat tombol diklik
  uploaderBtn.addEventListener('click', async () => {
    if (uploaderInput.files.length === 0) {
      uploaderStatus.innerHTML = '<span style="color: #ff5252;"><i class="fa-solid fa-triangle-exclamation"></i> Pilih file terlebih dahulu!</span>';
      return;
    }

    const file = uploaderInput.files[0];
    const reader = new FileReader();

    uploaderBtn.disabled = true;
    uploaderBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i><span>Mengunggah...</span>';
    uploaderStatus.innerHTML = '<span style="color: var(--muted);">Menyiapkan data file...</span>';

    reader.onload = async function(e) {
      const base64Data = e.target.result;
      const fileName = file.name;
      const payload = JSON.stringify({ base64Data, fileName });

      try {
        // Pastikan ini adalah URL GAS Anda yang terbaru
        const gasUrl = 'https://script.google.com/macros/s/AKfycbw3XENLYI_ZYGCDcCBXtugMYLeNl4z3lr6J2XNTsM7R3vw11fjyhmaId-OwSlTLb-pi/exec';

        const response = await fetch(gasUrl, {
          method: 'POST',
          body: payload,
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });

        const result = await response.json();
        uploaderBtn.disabled = false;

        if (result.status === 'success') {
          uploaderBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i><span>Upload File Lain</span>';
          
          // Ini dia bagian directUrl yang dicari, lengkap dengan class tombol membulat (global-btn)
          uploaderStatus.innerHTML = `
            <div style="color: var(--accent); margin-bottom: 12px; font-weight: 600;">
              <i class="fa-solid fa-circle-check"></i> Berhasil Diunggah!
            </div>
            <a href="${result.url}" class="global-btn primary-btn liquid-glass upload-action-btn" target="_blank" style="text-decoration: none;">
              <i class="fa-solid fa-download"></i><span>Unduh File</span>
            </a>
          `;
          uploaderInput.value = '';
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        uploaderBtn.disabled = false;
        uploaderBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i><span>Coba Lagi</span>';
        uploaderStatus.innerHTML = `<span style="color: #ff5252;"><i class="fa-solid fa-circle-xmark"></i> Gagal: ${error.message}</span>`;
      }
    };

    reader.readAsDataURL(file);
  });
}
