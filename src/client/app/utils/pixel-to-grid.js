export default function convertPixelHeightToGridHeight(pixelHeight, margin, gridRowHeight, maxGridHeight) {
  const gridHeight = ((pixelHeight - margin[1]) / (gridRowHeight + margin[1])) + 2;
  return Math.min(Math.max(3, gridHeight), maxGridHeight);
}
