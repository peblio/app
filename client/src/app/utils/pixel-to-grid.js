import * as WidgetSize from '../constants/widgetConstants.js';

export function convertPixelHeightToGridHeight(pixelHeight, margin, gridRowHeight, maxGridHeight) {
  const gridHeight = ((pixelHeight - margin[1]) / (gridRowHeight + margin[1])) + 2;
  return Math.min(Math.max(WidgetSize.TEXT_MIN_HEIGHT, gridHeight), maxGridHeight);
}
export function convertWorkspaceDescHeight(charLength, lineHeight, margin, gridRowHeight, maxGridHeight) {
  // the below code assumes that the average pixel width of a letter is 8px and that the width of the text box is 800px

  const height = Math.ceil(charLength * 8 / 800) * lineHeight;
  return convertPixelHeightToGridHeight(height, margin, gridRowHeight, maxGridHeight);
}
