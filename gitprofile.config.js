// gitprofile.config.js

const config = {
  github: {
    username: 'CraXID', // Your GitHub org/user name. (Required)
    sortBy: 'stars', // stars | updated
    limit: 3, // How many projects to display.
    exclude: {
      forks: true, // Forked projects will not be displayed if set to true.
      projects: [], // These projects will not be displayed. example: ['my-project1', 'my-project2']
    },
  },
  social: {
    linkedin: '',
    twitter: 'dede_klender',
    mastodon: '',
    facebook: 'dede2015k',
    instagram: 'dede_klender',
    youtube: 'ClanDare', // example: 'pewdiepie'
    dribbble: '',
    behance: '',
    medium: '',
    dev: 'dede_klender',
    stackoverflow: '', // example: '1/jeff-atwood'
    skype: '',
    telegram: 'ClanDare',
    website: 'https://crax.my.id',
    phone: '',
    email: 'dev@crax.my.id',
  },
  resume: {
    fileUrl:
      '', // Empty fileUrl will hide the `Download Resume` button.
  },

// To hide the `My Projects` section, keep it empty.
  externalProjects: [
    {
      title: 'CraXID Bot',
      description:
        'Bot WhatsApp gratis yang memiliki banyak fitur unggul!',
      imageUrl: 'https://telegra.ph/file/98338f32943a9812f2544.jpg',
      link: 'https://crax.my.id/bot/',
    },
  ],
  
  skills: [
    'Masih Belajar',
  ],
  experiences: [
    /*{
      company: '',
      position: '',
      from: '',
      to: '',
      companyLink: '',
    },
    {
      company: '',
      position: '',
      from: '',
      to: '',
      companyLink: '',
    },*/
  ],
  /* certifications: [
    {
      name: 'Lorem ipsum',
      body: 'Lorem ipsum dolor sit amet',
      year: 'March 2022',
      link: 'https://example.com'
    },
  ], */
 education: [
    /*{
      institution: '',
      degree: '',
      from: '',
      to: '',
    },
    {
      institution: '',
      degree: '',
      from: '',
      to: '',
    },*/
  ],

  /* To hide the `My Projects` section, keep it empty.
  externalProjects: [
    {
      title: 'Bot Mika',
      description:
        'Bot WhatsApp gratis yang memiliki banyak fitur unggul!',
      imageUrl: 'https://telegra.ph/file/81294ddc338c1d69ca45e.jpg',
      link: 'https://crax.my.id/mika',
    },
    /*{
      title: '',
      description:
        '',
      imageUrl: '',
      link: '',
    },
  ],*/
  // Display blog posts from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: 'dede_klender', // to hide blog section, keep it empty
    limit: 2, // How many posts to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'light',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Hide the ring in Profile picture
    hideAvatarRing: false,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'procyon',
    ],

    // Custom theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made with ❤️ by <a 
      class="text-primary" href="https://github.com/craxid/"
      target="_blank"
      rel="noreferrer"
    >CraXID</a>`,
};

export default config;
