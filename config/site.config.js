// Site-wide settings. Change behaviour here, not in components.
// Everything below is SAMPLE data for "Jordan Example". Claude replaces it in Step 3 of CLAUDE.md.
export const site = {
  name: { first: "Jordan", last: "Example" },
  monogram: "JE",
  today: "2026-10", // the career chart runs up to this month (YYYY-MM). Bump it when you update the site.
  resume: "", // e.g. "files/resume.pdf": public copy of your résumé, NO phone number or home address. "" hides every résumé button.

  contact: {
    linkedin: "https://www.linkedin.com/in/your-handle",
    // One extra footer link (club, company, GitHub, Substack...). Set href to "" to hide it.
    extra: { label: "github.com/jordan", href: "" },
  },

  // Colours and fonts. Change the whole look here. Pick colours with enough contrast on a dark background.
  theme: {
    // Default: University of Minnesota maroon, gold and white. Swap these for your own school or brand.
    colors: {
      bg: "#12060a", // page background: near-black maroon
      surface: "#1d0a10", // cards
      "surface-2": "#2a1019",
      line: "#3a1722",
      ink: "#ffffff", // main text: white
      muted: "#e0c9cf", // secondary text: warm white
      accent: "#ffcc33", // UMN gold: links, tags, buttons, glow, dot field
      "accent-ink": "#3a0010", // text on gold buttons: deep maroon
      "accent-2": "#7a0019", // UMN maroon: the big ambient glow behind the page
    },
    // Career chart dot colours, one per track key in content/profile.js → tracks.
    tracks: { school: "#ffcc33", work: "#e0c9cf", internship: "#f5a524", leadership: "#ff6b81", sport: "#8fd3c1" },
    font: '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',
    fontsUrl: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap",
  },

  // Sidebar navigation (also added to the command menu). `feature` hides the link when that feature is off.
  sections: [
    { label: "About", href: "#about", keywords: "bio summary" },
    { label: "Focus", href: "#focus", keywords: "what I'm building now", feature: "focus" },
    { label: "Experience", href: "#experience", keywords: "jobs resume internships chart" },
    { label: "Projects", href: "#projects", keywords: "work portfolio case studies" },
    { label: "Toolkit", href: "#toolkit", keywords: "tools skills software", feature: "toolkit" },
    { label: "Story", href: "#story", keywords: "map journey hometown", feature: "journey" },
    { label: "Beyond", href: "#life", keywords: "hobbies sports volunteering", feature: "beyond" },
    { label: "Ask me", href: "#ask", keywords: "questions faq", feature: "ask" },
  ],

  // Extra command-menu entries (sections, roles, projects, résumé and LinkedIn are added automatically).
  commands: [
    { label: "Replay the career chart", hint: "action", action: "replay-career" },
    { label: "Back to top", hint: "jump", href: "#top" },
  ],

  // Turn whole sections and effects on/off. false = gone from the page and the sidebar.
  features: {
    focus: true, // "what I'm into right now" timeline + optional live site embed (content/focus.js)
    toolkit: true, // logo grid of the tools you use (content/toolkit.js)
    career: true, // the scrubbable career chart above Experience
    journey: true, // the hometown-to-here map (content/journey.js). Works best for North America.
    mapBorders: true, // faint state/province outlines on the map
    beyond: true, // "Beyond the classroom" text, facts and up to 3 photos
    ask: true, // "Ask me" prewritten Q&A (content/ask.js)
    palette: true, // the K / Cmd+K command menu
    now: true, // "Right now" card in About (content/copy.js → now)
    field: true, // cursor-reactive dot field behind the page
    scramble: true, // section labels decode in on scroll
    motion: true, // entrance animations (reduced-motion is always respected)
  },
};
