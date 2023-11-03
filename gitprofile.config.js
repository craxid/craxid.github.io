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
    dev: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    skype: '',
    telegram: 'ClanDare',
    website: 'https://crax.my.id',
    phone: '',
    email: 'dev@crax.my.id',
  },
  resume: {
    fileUrl:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    '',
    '',
    'JavaScript',
    'React.js',
    'Node.js',
    '',
    'MySQL',
    '',
    'Git',
    'Docker',
    '',
    'CSS',
    '',
    '',
  ],
  experiences: [
    {
      company: 'CraXID Project',
      position: 'Pendiri',
      from: 'Februari 2018',
      to: 'Sekarang',
      companyLink: 'https://crax.my.id',
    },
    {
      company: '',
      position: '',
      from: '',
      to: '',
      companyLink: '',
    },
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
    {
      institution: 'SDN Klender 24 Pagi Jakarta',
      degree: '',
      from: '2005',
      to: '2008',
    },
    {
      institution: '',
      degree: '',
      from: '',
      to: '',
    },
  ],

  // To hide the `My Projects` section, keep it empty.
  externalProjects: [
    {
      title: 'Mika WhatsApp Bot',
      description:
        'Bot WhatsApp Gratis',
      imageUrl: '',
      link: '',
    },
    {
      title: '',
      description:
        '',
      imageUrl: '',
      link: '',
    },
  ],
  // Display blog posts from your medium or dev account. (Optional)
  blog: {
    source: '', // medium | dev
    username: '', // to hide blog section, keep it empty
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
  footer: `Made with <a 
      class="text-primary" href="https://github.com/craxid/"
      target="_blank"
      rel="noreferrer"
    >CraXID</a> and ❤️`,
};

export default config;
