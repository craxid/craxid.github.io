const root = document.documentElement;
const body = document.body;

root.style.setProperty("--accent", CONFIG.accentColor);

/* =========================
   CLOUDFLARE WEB ANALYTICS
   Beacon disuntik dari sini agar cukup pasang sekali untuk semua halaman.
   Token beacon bersifat publik (dirancang untuk dilihat semua orang).
========================= */
if (typeof CONFIG !== "undefined" && CONFIG.cfBeaconToken) {
  const cfBeacon = document.createElement("script");
  cfBeacon.defer = true;
  cfBeacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  cfBeacon.setAttribute(
    "data-cf-beacon",
    JSON.stringify({ token: CONFIG.cfBeaconToken })
  );
  document.head.appendChild(cfBeacon);
}

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
  TypeScript: "fa-solid fa-code",
  Python: "fa-brands fa-python",
  Java: "fa-brands fa-java",
  PHP: "fa-brands fa-php",
  Ruby: "fa-solid fa-gem",
  Go: "fa-solid fa-code",
  Rust: "fa-solid fa-gears",
  "C#": "fa-solid fa-code",
  "C++": "fa-solid fa-code",
  C: "fa-solid fa-code",
  Kotlin: "fa-solid fa-code",
  Swift: "fa-brands fa-swift",
  Dart: "fa-solid fa-code",
  Lua: "fa-solid fa-moon",
  Shell: "fa-solid fa-terminal",
  Dockerfile: "fa-brands fa-docker",
  HTML: "fa-brands fa-html5",
  CSS: "fa-brands fa-css3-alt",
  Vue: "fa-brands fa-vuejs",
  React: "fa-brands fa-react",
  Angular: "fa-brands fa-angular",
  "Node.js": "fa-brands fa-node-js",
  Laravel: "fa-brands fa-laravel",
  "REST API": "fa-solid fa-cloud",
  GitHub: "fa-brands fa-github",
  "Bot Development": "fa-solid fa-robot",
  Render: "fa-solid fa-cube",
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
                <i class="${icons[repo.language] || "fa-solid fa-code"}"></i>
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
   BLOG LIST
========================= */

function formatBlogDate(dateString) {
  const date = new Date(dateString + "T00:00:00");

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function loadBlogList() {
  const container = document.getElementById("blog-list");

  if (!container) {
    return;
  }

  try {
    container.innerHTML = `
      <p class="description">
        Memuat daftar tulisan...
      </p>
    `;

    const response = await fetch("/content/index.json");

    if (!response.ok) {
      throw new Error("Gagal mengambil daftar tulisan.");
    }

    const posts = await response.json();

    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    if (!sortedPosts.length) {
      container.innerHTML = `
        <p class="description">
          Belum ada tulisan.
        </p>
      `;
      return;
    }

    container.innerHTML = sortedPosts
      .map(
        (post) => `
          <article class="project-card liquid-glass">
            <a href="/blog/${encodeURIComponent(post.slug)}/">
              ${post.title}
            </a>

            <p>
              ${post.description || ""}
            </p>

            <div class="project-meta">
              <span>
                <i class="fa-solid fa-calendar-days"></i>
                ${formatBlogDate(post.date)}
              </span>

              ${(post.tags || [])
                .map(
                  (tag) => `
                    <span>
                      <i class="fa-solid fa-tag"></i>
                      ${tag}
                    </span>
                  `
                )
                .join("")}
            </div>
          </article>
        `
      )
      .join("");
  } catch (error) {
    container.innerHTML = `
      <p class="description">
        Daftar tulisan gagal dimuat.
      </p>
    `;
  }
}

/* =========================
   INIT
========================= */

renderTechStack();
loadProjects();
loadBlogList();

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

/* =========================
   BUILD.PROP GENERATOR
   Dipakai di halaman /props/
========================= */

const buildPropTemplate = `## Fringerprint - Custom Props for Android - @ CraXID Project

###
# begin product/etc/build.prop
###

# begin common build properties
ro.product.product.brand={namaBrand}
ro.product.product.device={namaKode}
ro.product.product.manufacturer={pembuat}
ro.product.product.model={model}
ro.product.product.name={namaKode}
ro.product.build.date={buildDate}
ro.product.build.date.utc={buildDateUtc}
ro.product.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.product.build.id=TQ3A.230901.001
ro.product.build.tags=release-keys
ro.product.build.type=user
ro.mkm=@makima
ro.product.build.version.incremental=10750268
ro.product.build.version.release={versiAndroid}
ro.product.build.version.release_or_codename={versiAndroid}
ro.product.build.version.sdk={versiSDK}
# end common build properties

# begin PRODUCT_PRODUCT_PROPERTIES
ro.support_one_handed_mode=true
ro.charger.enable_suspend=true
ro.opa.eligible_device=true
ro.com.google.ime.bs_theme=true
ro.com.google.ime.theme_id=5
ro.com.google.ime.system_lm_dir=/product/usr/share/ime/google/d3_lms
# end PRODUCT_PRODUCT_PROPERTIES

###
# end product/etc/build.prop
###

###
#-#
###

###
# begin vendor/build.prop
###

# begin common build properties
ro.product.vendor.brand={namaBrand}
ro.product.vendor.device={namaKode}
ro.product.vendor.manufacturer={pembuat}
ro.product.vendor.model={model}
ro.product.vendor.name={namaKode}
ro.vendor.build.date={buildDate}
ro.vendor.build.date.utc={buildDateUtc}
ro.vendor.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.vendor.build.id=TQ3A.230901.001
ro.vendor.build.tags=release-keys
ro.vendor.build.type=user
ro.vendor.build.version.incremental=10750268
ro.vendor.build.version.release={versiAndroid}
ro.vendor.build.version.release_or_codename={versiAndroid}
ro.vendor.build.version.sdk={versiSDK}
# end common build properties

# begin ADDITIONAL_VENDOR_PROPERTIES
ro.vendor.build.security_patch={securityPatch}
# end ADDITIONAL_VENDOR_PROPERTIES

# begin BOOTIMAGE_build_prop to_system_propERTIES
ro.bootimage.build.date={buildDate}
ro.bootimage.build.date.utc={buildDateUtc}
ro.bootimage.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
# end BOOTIMAGE_build_prop to_system_propERTIES

# begin PRODUCT_PROPERTY_OVERRIDES
persist.rcs.supported=1
persist.sysui.monet=true
# end PRODUCT_PROPERTY_OVERRIDES

###
# end vendor/build.prop
###

###
#-#
###

###
# begin vendor/odm/etc/build.prop
###

# begin common build properties
ro.product.odm.brand={namaBrand}
ro.product.odm.device={namaKode}
ro.product.odm.manufacturer={pembuat}
ro.product.odm.model={model}
ro.product.odm.name={namaKode}
ro.odm.build.date={buildDate}
ro.odm.build.date.utc={buildDateUtc}
ro.odm.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.odm.build.id=TQ3A.230901.001
ro.odm.build.tags=release-keys
ro.odm.build.type=user
ro.odm.build.version.incremental=10750268
ro.odm.build.version.release={versiAndroid}
ro.odm.build.version.release_or_codename={versiAndroid}
ro.odm.build.version.sdk={versiSDK}
# end common build properties

###
# end vendor/odm/etc/build.prop
###

###
#-#
###

###
# begin system/system/build.prop
###

# begin common build properties
ro.product.system.brand={namaBrand}
ro.product.system.device={namaKode}
ro.product.system.manufacturer={pembuat}
ro.product.system.model={model}
ro.product.system.name={namaKode}
ro.system.build.date={buildDate}
ro.system.build.date.utc={buildDateUtc}
ro.system.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.system.build.id=TQ3A.230901.001
ro.system.build.tags=release-keys
ro.system.build.type=user
ro.system.build.version.incremental=10750268
ro.system.build.version.release={versiAndroid}
ro.system.build.version.release_or_codename={versiAndroid}
ro.system.build.version.sdk={versiSDK}
# end common build properties

# begin build properties
ro.build.id=TQ3A.230901.001
ro.build.display.id=TQ3A.230901.001
ro.build.version.incremental=10750268
ro.build.version.sdk={versiSDK}
ro.build.version.release={versiAndroid}
ro.build.version.release_or_codename={versiAndroid}
ro.build.version.security_patch={securityPatch}
ro.build.date={buildDate}
ro.build.date.utc={buildDateUtc}
ro.build.type=user
ro.build.user=android-build
ro.build.host=Maki.TQ3A.230901.001
ro.build.tags=release-keys
ro.build.flavor={namaKode}-user
ro.build.product={namaKode}
ro.build.description={namaKode}-user {versiAndroid} TQ3A.230901.001 10750268 release-keys
# end build properties

# begin extra's from /system/build.prop
ro.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.product.brand={namaBrand}
ro.product.device={namaKode}
ro.product.manufacturer={pembuat}
ro.product.model={model}
ro.product.name={namaKode}
# end extra's from /system/build.prop

###
# end system/system/build.prop
###

###
#-#
###

###
# begin system_ext/etc/build.prop
###

# begin common build properties
ro.product.system_ext.brand={namaBrand}
ro.product.system_ext.device={namaKode}
ro.product.system_ext.manufacturer={pembuat}
ro.product.system_ext.model={model}
ro.product.system_ext.name={namaKode}
ro.system_ext.build.date={buildDate}
ro.system_ext.build.date.utc={buildDateUtc}
ro.system_ext.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.system_ext.build.id=TQ3A.230901.001
ro.system_ext.build.tags=release-keys
ro.system_ext.build.type=user
ro.system_ext.build.version.incremental=10750268
ro.system_ext.build.version.release={versiAndroid}
ro.system_ext.build.version.release_or_codename={versiAndroid}
ro.system_ext.build.version.sdk={versiSDK}
# end common build properties

###
# end system_ext/etc/build.prop
###

## Original Project by @T3SL4`;

const propForm = document.getElementById("propForm");
const propStatus = document.getElementById("propStatus");

// Cek apakah user sedang berada di halaman generator
if (propForm) {
  // Kumpulkan data form + tanggal dinamis mengikuti waktu generate
  const collectPropData = () => {
    // Format UTC ala `date`: "Fri Sep  1 12:20:23 UTC 2023"
    const now = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const pad2 = (n) => String(n).padStart(2, "0");
    const buildDate =
      `${dayNames[now.getUTCDay()]} ${monthNames[now.getUTCMonth()]} ` +
      `${String(now.getUTCDate()).padStart(2, " ")} ` +
      `${pad2(now.getUTCHours())}:${pad2(now.getUTCMinutes())}:${pad2(now.getUTCSeconds())} ` +
      `UTC ${now.getUTCFullYear()}`;

    return {
      namaBrand: document.getElementById("namaBrand").value.trim(),
      namaKode: document.getElementById("namaKode").value.trim(),
      pembuat: document.getElementById("pembuat").value.trim(),
      model: document.getElementById("model").value.trim(),
      versiAndroid: document.getElementById("versiAndroid").value.trim(),
      versiSDK: document.getElementById("versiSDK").value.trim(),
      buildDate,
      buildDateUtc: String(Math.floor(now.getTime() / 1000)),
      securityPatch: `${now.getUTCFullYear()}-${pad2(now.getUTCMonth() + 1)}-01`,
    };
  };

  // Bangun isi file-file modul dari data form
  const buildPropFiles = (data) => {
    let systemProp = buildPropTemplate;
    Object.keys(data).forEach((key) => {
      systemProp = systemProp.replace(
        new RegExp(`\\{${key}\\}`, "g"),
        data[key]
      );
    });

    const moduleProp = `
id=build.prop ${data.namaKode}
name=Custom build.prop ${data.namaKode} by CraXID Project
version=1.0.0
versionCode=1
author=CraXID Project
description=Auto-generated Magisk/APatch/KernelSU/SukiSU module to override build.prop entries by CraXID Project
minMagisk=2318
`.trim();

    const serviceSh = `#!/system/bin/sh
# Magisk will auto-apply system.prop
`.trim();

    return { systemProp, moduleProp, serviceSh };
  };

  if (typeof JSZip === "undefined") {
    if (propStatus) {
      propStatus.textContent = "Gagal memuat library JSZip.";
    }
  } else {
    propForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = collectPropData();
      const files = buildPropFiles(data);

      try {
        if (propStatus) {
          propStatus.textContent = "Membuat ZIP...";
        }

        const zip = new JSZip();
        zip.file("system.prop", files.systemProp);
        zip.file("module.prop", files.moduleProp);
        zip.file("service.sh", files.serviceSh);

        const blob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.namaBrand}_${data.model}_magisk_module_by_CraXID_Project.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        if (propStatus) {
          propStatus.textContent = "ZIP berhasil dibuat dan diunduh.";
        }
      } catch (error) {
        if (propStatus) {
          propStatus.textContent = "Gagal membuat ZIP: " + error.message;
        }
      }
    });

    // ===== Pratinjau hasil generate =====
    const propPreviewBtn = document.getElementById("propPreviewBtn");
    const propPreview = document.getElementById("propPreview");
    const propPreviewContent = document.getElementById("propPreviewContent");
    const propPreviewClose = document.getElementById("propPreviewClose");
    const propPreviewTabs = document.querySelectorAll(".prop-preview-tab");
    let previewFiles = null;

    const popElement = (el, className) => {
      if (!el) return;
      el.classList.remove(className);
      void el.offsetWidth; // paksa reflow agar animasi bisa diulang
      el.classList.add(className);
    };

    const showPreviewFile = (which) => {
      if (!previewFiles || !propPreviewContent) return;
      propPreviewContent.textContent =
        which === "module" ? previewFiles.moduleProp : previewFiles.systemProp;
      popElement(propPreviewContent, "pop");
    };

    if (propPreviewBtn && propPreview && propPreviewContent) {
      propPreviewBtn.addEventListener("click", () => {
        // Validasi form dulu, sama seperti saat submit
        if (!propForm.reportValidity()) return;

        previewFiles = buildPropFiles(collectPropData());

        propPreviewTabs.forEach((tab) =>
          tab.classList.toggle("active", tab.dataset.file === "system")
        );
        showPreviewFile("system");
        propPreview.hidden = false;
        popElement(propPreview, "open");
        propPreview.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }

    if (propPreviewClose && propPreview) {
      propPreviewClose.addEventListener("click", () => {
        propPreview.hidden = true;
      });
    }

    propPreviewTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        propPreviewTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        showPreviewFile(tab.dataset.file);
      });
    });
  }
}

/* =========================
   SPARKS — percikan hijau di setiap sentuhan
   Ringan: ~12 partikel per sentuhan, animasi transform+opacity (GPU),
   partikel dibersihkan otomatis, hormati prefers-reduced-motion.
========================= */
(function initSparks() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layer = document.createElement("div");
  layer.className = "spark-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  let lastBurst = 0;

  function burst(x, y) {
    const now = performance.now();
    if (now - lastBurst < 90) return; // cegah spam partikel saat diklik cepat
    lastBurst = now;

    const count = 12;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "spark";
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
      const dist = 36 + Math.random() * 46;
      const size = 4 + Math.random() * 5;
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.marginLeft = -size / 2 + "px";
      s.style.marginTop = -size / 2 + "px";
      s.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      s.style.setProperty("--dy", Math.sin(angle) * dist + "px");
      s.addEventListener("animationend", () => s.remove());
      layer.appendChild(s);
    }
  }

  // Setiap sentuhan di mana saja memicu percikan (bukan cuma tombol)
  document.addEventListener("pointerdown", (e) => {
    if (e.button !== undefined && e.button !== 0) return; // abaikan klik kanan/tengah
    burst(e.clientX, e.clientY);
  });

  // Akses keyboard (Enter/Space): percikan dari tengah elemen yang difokus
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const el = e.target.closest ? e.target.closest("button, a") : null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
  });
})();

/* =========================
   BROADCAST (pengumuman dari pemilik web)
========================= */
(function initBroadcast() {
  const url = ((window.CONFIG && CONFIG.broadcastWorker) || "").replace(/\/$/, "");
  if (!url || !document.body) return;
  const KEY = "cxbroadcast_dismissed";
  fetch(url, { cache: "no-store" })
    .then((r) => { if (!r.ok) throw 0; return r.json(); })
    .then((d) => {
      const msg = ((d && d.message) || "").trim();
      if (!msg) return;
      try { if (localStorage.getItem(KEY) === String(d.updatedAt)) return; } catch {}
      const bar = document.createElement("div");
      bar.className = "broadcast-bar";
      bar.setAttribute("role", "status");
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-bullhorn";
      icon.setAttribute("aria-hidden", "true");
      const txt = document.createElement("span");
      txt.textContent = msg;
      const btn = document.createElement("button");
      btn.className = "broadcast-close";
      btn.setAttribute("aria-label", "Tutup pengumuman");
      btn.textContent = "\u00d7";
      btn.addEventListener("click", () => {
        try { localStorage.setItem(KEY, String(d.updatedAt)); } catch {}
        bar.remove();
      });
      bar.append(icon, txt, btn);
      document.body.insertBefore(bar, document.body.firstChild);
    })
    .catch(() => {});
})();
