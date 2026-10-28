// "Ask me": prewritten answers in your own words, the questions a recruiter would ask. SAMPLE data.
// 4–6 items. Each can link to the section with the proof (#about, #experience, #projects...) or anywhere.
export const ask = {
  heading: "Ask me anything (almost)",
  note: "Pick a question. The answers are mine, written ahead of time.",
  items: [
    {
      q: "What do you do right now?",
      a: "I study Marketing at University of Minnesota, lead the 60-member Marketing Club, and I'm looking for a summer 2027 analytics internship.",
      link: { label: "See my experience", href: "#experience" },
    },
    {
      q: "What's your best work so far?",
      a: "The reporting dashboard at Northwind: it took a four-hour weekly report down to thirty minutes and surfaced $40K a year in wasted ad spend.",
      link: { label: "See the projects", href: "#projects" },
    },
    {
      q: "What are you looking for?",
      a: "A marketing analytics internship where I get to work with real data. Message me on LinkedIn.",
      link: { label: "Connect on LinkedIn", href: "https://www.linkedin.com/in/your-handle" },
    },
  ],
};
