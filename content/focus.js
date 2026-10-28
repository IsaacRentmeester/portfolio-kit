// The "Focus" section (feature: focus): what you're going deep on right now. SAMPLE data.
// Good fits: building with AI, a startup, research, a club you founded, a sport, a creative practice.
// startedOn also drives {days} in the sidebar status line and the about copy.
export const focus = {
  startedOn: "2026-06-01",
  label: "Focus", // the small section label (also change the sidebar link in config if you rename it)
  // {days} = live day counter, {projects} = number of projects in content/projects.js
  lead: "{days} days and counting since I started building with AI. {projects} projects shipped so far.",
  timeline: [
    { when: "Jun 2026", text: "Started using Claude every day for school and work." },
    { when: "Summer", text: "Automated campaign reporting at Northwind Outdoor." },
    { when: "Fall 2026", text: "Built this site and the Marketing Club's sign-up page with Claude Code." },
    { when: "Now", text: "Teaching club members to build their own portfolio sites." },
  ],
  // Optional live website shown in a browser frame. url: "" hides it. Some sites block embedding; check it loads.
  club: { heading: "example.com", note: "A site I built. Live, scroll inside it.", url: "" },
};
