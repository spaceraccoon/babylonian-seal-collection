/**
 * Hashes the string to a CSS string specifying HSL color values.
 * @param {*} str
 */
const stringToColour = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  let hue = hash % 361;
  let saturation = hash % 101;
  let lightness = hash % 31 + 30;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default stringToColour;
