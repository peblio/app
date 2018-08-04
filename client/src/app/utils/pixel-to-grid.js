import * as WidgetSize from '../constants/widgetConstants.js';

export default function convertPixelHeightToGridHeight(pixelHeight, margin, gridRowHeight, maxGridHeight) {
  const gridHeight = ((pixelHeight - margin[1]) / (gridRowHeight + margin[1])) + 2;
  return Math.min(Math.max(WidgetSize.TEXT_MIN_HEIGHT, gridHeight), maxGridHeight);
}
