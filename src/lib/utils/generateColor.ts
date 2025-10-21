/**
 * Generates a consistent color palette from a text string.
 * Uses a hash function to create deterministic colors based on input.
 *
 * @param {string} text - Text to generate color from.
 * @returns {object} Color palette with backgroundColor, color, and borderColor.
 */
export function generateColor(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  const s = 70; // saturation
  const l = 85; // lightness

  const backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  const color = `hsl(${h}, ${s}%, ${l - 45}%)`;
  const borderColor = `hsl(${h}, ${s}%, ${l - 25}%)`;

  return { backgroundColor, color, borderColor };
}
