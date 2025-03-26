export const colorHex2Rgb = (hex: string): string => {
  hex = hex.replace(/^#/, '');

  // 判断 HEX 颜色格式
  const isShort = hex.length === 3 || hex.length === 4;
  const isLong = hex.length === 6 || hex.length === 8;

  if (!isShort && !isLong) {
    throw new Error('Invalid HEX color format');
  }

  if (isShort) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  if (hex.length === 8) {
    const a = (parseInt(hex.slice(6, 8), 16) / 255).toFixed(2);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
};

export const colorHex2RgbObject = (
  rgba: string
): { r: number; g: number; b: number; a?: number } => {
  const match = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
  if (!match) {
    throw new Error('Invalid RGB/RGBA color format');
  }
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a = match[4] ? parseFloat(match[4]) : undefined;
  return { r, g, b, a };
};

