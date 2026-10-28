// Your photos live in /photos. Each entry: src, alt (describe the photo), w/h (pixel size), optional credit.
// SAMPLE: src "" = no photo yet (the page hides it). Keys are used by content/journey.js (photo: "key").
// Resize big photos first: about 1600px on the long side, JPG, under 400 KB each.
export const photos = {
  headshot: { src: "", alt: "Jordan Example, smiling, in a navy blazer", w: 900, h: 900 },
  one: { src: "", alt: "", w: 1600, h: 1200 },
  two: { src: "", alt: "", w: 1600, h: 1200 },
  three: { src: "", alt: "", w: 1600, h: 1200 },
};

// Up to three photos shown in "Beyond the classroom", in order.
export const gallery = { keys: ["one", "two", "three"] };
