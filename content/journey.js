// The map (feature: journey): one stop per chapter of your life, oldest first. SAMPLE data.
// lat/lon: look them up (search "<town> coordinates"). label: where the name sits, "above" | "below" | "left" | "right".
// photo (optional): a key from content/photos.js, shown on that stop's card.
export const stops = [
  {
    id: "home", label: "below", place: "Rochester, Minnesota", lat: 44.012, lon: -92.48,
    when: "Growing up", title: "Home",
    text: "Where I grew up and started working at sixteen.",
  },
  {
    id: "college", label: "above", place: "Minneapolis, Minnesota", lat: 44.974, lon: -93.234,
    when: "Sept 2024", title: "University of Minnesota",
    text: "Started my Marketing degree and joined the Marketing Club.",
    photo: "headshot",
  },
  {
    id: "internship", label: "right", place: "St. Paul, Minnesota", lat: 44.954, lon: -93.09,
    when: "Summer 2026", title: "Northwind Outdoor",
    text: "Marketing analytics intern.",
  },
];
