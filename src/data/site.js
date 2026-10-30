// Single source of truth for personal details, links and computed facts.
// Edit this file instead of hunting through the pages.

export const PROFILE = {
  name: 'Hagop Hadjiakian',
  email: 'hagophadjiakian@gmail.com',
  location: 'Lebanon / Armenia',
  siteUrl: 'https://hagophadjiakian2028.vercel.app',
  // Put your CV in /public (for example public/Hagop-Hadjiakian-CV.pdf) and set the path here.
  // The "Download CV" buttons only appear once this is set.
  cvUrl: null,
};

// icon keys are resolved by <SocialIcon name="..." />
export const LINKS = [
  { name: 'Email', handle: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: 'email' },
  { name: 'GitHub', handle: 'hagophadjiakian', href: 'https://github.com/hagophadjiakian', icon: 'github' },
  {
    name: 'LinkedIn',
    handle: 'hagop-a-hadjiakian',
    href: 'https://www.linkedin.com/in/hagop-a-hadjiakian-744b32156',
    icon: 'linkedin',
  },
  { name: 'NeurolinkUp', handle: 'neurolinkup.com', href: 'https://neurolinkup.com', icon: 'neurolinkup' },
  { name: 'Instagram', handle: '@hagop_a_hadji_akian', href: 'https://www.instagram.com/hagop_a_hadji_akian/', icon: 'instagram' },
  { name: 'Facebook', handle: 'Hagop Hadjiakian', href: 'https://www.facebook.com/hagop.aris.hadjiakian/', icon: 'facebook' },
];

export const isExternal = (href) => !href.startsWith('mailto:');

// Background music, one short loop per page. Files live in /public/audio.
export const AUDIO_TRACKS = {
  '/': '/audio/home.mp3',
  '/about': '/audio/about.mp3',
  '/projects': '/audio/projects.mp3',
  '/skills': '/audio/skills.mp3',
  '/experience': '/audio/experience.mp3',
  '/videos': '/audio/projects.mp3',
  '/contact': '/audio/home.mp3',
};

export const trackFor = (pathname) => AUDIO_TRACKS[pathname] || AUDIO_TRACKS['/'];

// Dates used to keep the numbers on the site correct every year.
const INJURY_DATE = new Date(2013, 6, 1); // mid-2013
const TECH_START = new Date(2019, 11, 1); // December 2019

export const fullYearsSince = (date, now = new Date()) => {
  let years = now.getFullYear() - date.getFullYear();
  const beforeAnniversary =
    now.getMonth() < date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() < date.getDate());
  if (beforeAnniversary) years -= 1;
  return years;
};

export const yearsSinceInjury = () => fullYearsSince(INJURY_DATE);
export const yearsInTech = () => fullYearsSince(TECH_START);

// Title and description for each page (browser tab, search results, link previews).
export const ROUTE_META = {
  '/': {
    title: null,
    description:
      'Hagop Hadjiakian — software and QA engineer, electrical engineer and spinal cord injury survivor building rehabilitation technology.',
  },
  '/about': {
    title: 'My Story',
    description:
      'From a spinal cord injury in 2013 to an engineering degree, HAL exoskeleton rehabilitation in Japan and building rehabilitation technology.',
  },
  '/projects': {
    title: 'Projects',
    description: 'Passive knee exoskeleton, EMG-controlled motor device and home-built neurological rehabilitation devices.',
  },
  '/skills': { title: 'Skills', description: 'Testing and QA, programming, DevOps and rehabilitation-technology skills.' },
  '/experience': { title: 'Journey', description: 'Work, rehabilitation and education milestones of Hagop Hadjiakian.' },
  '/videos': { title: 'Videos', description: 'Video records of my rehabilitation journey and projects.' },
  '/contact': { title: 'Contact', description: 'Get in touch with Hagop Hadjiakian by email, LinkedIn or GitHub.' },
};

export const pageTitle = (title) => (title ? `${title} | ${PROFILE.name}` : `${PROFILE.name} | Portfolio`);
