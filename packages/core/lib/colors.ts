export function colorHex2Rgb(hex: string): string {
  hex = hex.replace(/^#/, '')

  // 判断 HEX 颜色格式
  const isShort = hex.length === 3 || hex.length === 4
  const isLong = hex.length === 6 || hex.length === 8

  if (!isShort && !isLong) {
    throw new Error('Invalid HEX color format')
  }

  if (isShort) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('')
  }

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  if (hex.length === 8) {
    const a = (parseInt(hex.slice(6, 8), 16) / 255).toFixed(2)
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return `rgb(${r}, ${g}, ${b})`
}

export function colorHex2RgbObject(hex: string): { r: number, g: number, b: number, a?: number } {
  return colorRgbStr2RgbObject(colorHex2Rgb(hex))
}

export function colorRgbStr2RgbObject(rgba: string): { r: number, g: number, b: number, a?: number } {
  const match = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i)
  if (!match) {
    throw new Error('Invalid RGB/RGBA color format')
  }
  const r = parseInt(match[1], 10)
  const g = parseInt(match[2], 10)
  const b = parseInt(match[3], 10)
  const a = match[4] ? parseFloat(match[4]) : undefined
  // rgba
  return { r, g, b, a }
}

export function detectCssColorType(cssColor: string): { type: 'rgb' | 'rgba' | 'hex' | 'hexa' | 'lab' | 'unknown', value: any } {
  // HEX 颜色格式检测
  const hexRegex = /^#(?:[A-F0-9]{6}|[A-F0-9]{3}|[A-F0-9]{8}|[A-F0-9]{4})$/i
  if (hexRegex.test(cssColor)) {
    const length = cssColor.replace('#', '').length
    return {
      type: length === 8 || length === 4 ? 'hexa' : 'hex',
      value: cssColor,
    }
  }

  // RGB/RGBA 颜色格式检测
  const rgbRegex
    = /^rgba?\(\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*(?:,\s*([\d.]+)\s*)?\)$/
  const rgbMatch = cssColor.match(rgbRegex)
  if (rgbMatch) {
    return {
      type: rgbMatch[4] ? 'rgba' : 'rgb',
      value: {
        r: parseInt(rgbMatch[1]),
        g: parseInt(rgbMatch[2]),
        b: parseInt(rgbMatch[3]),
        a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : undefined,
      },
    }
  }

  // LAB 颜色格式检测
  const labRegex = /^lab\(\s*([\d.]+%?)\s+(-?[\d.]+%?)\s+(-?[\d.]+%?)\s*(?:\/\s*([\d.]+%?)\s*)?\)$/
  const labMatch = cssColor.match(labRegex)
  if (labMatch) {
    return {
      type: 'lab',
      value: {
        l: parseFloat(labMatch[1]),
        a: parseFloat(labMatch[2]),
        b: parseFloat(labMatch[3]),
        alpha: labMatch[4] ? parseFloat(labMatch[4]) : undefined,
      },
    }
  }
  // 未知颜色格式
  return {
    type: 'unknown',
    value: cssColor,
  }
}
