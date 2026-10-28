// The tools you use, grouped (feature: toolkit). SAMPLE data. List only tools you'd be happy to be asked about.
// logo: a file name in assets/logos (Simple Icons, CC0; download more from simpleicons.org as <name>.svg).
// mark: 1–2 letters when there's no logo file. brand: the colour the tile turns on hover.
export const toolkit = {
  heading: "Toolkit",
  more: "& more", // shown as the last tile in every group ("" hides it)
  groups: [
    { label: "AI", tools: [
      { name: "Claude", logo: "claude", brand: "#D97757" },
      { name: "ChatGPT", logo: "openai", brand: "#ffffff" },
      { name: "Gemini", logo: "googlegemini", brand: "#8E75B2" },
    ]},
    { label: "Analysis & office", tools: [
      { name: "Excel", logo: "microsoftexcel", brand: "#33C481" },
      { name: "PowerPoint", logo: "microsoftpowerpoint", brand: "#ED6C47" },
      { name: "Google Sheets", logo: "googlesheets", brand: "#34A853" },
      { name: "Google Analytics", mark: "GA", brand: "#F9AB00" },
    ]},
    { label: "Design & build", tools: [
      { name: "Canva", logo: "canva", brand: "#00C4CC" },
      { name: "GitHub", logo: "github", brand: "#ffffff" },
      { name: "Vercel", logo: "vercel", brand: "#ffffff" },
    ]},
  ],
};
