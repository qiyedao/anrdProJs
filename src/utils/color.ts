export function parseColor(color: string): RGBAColor | null {
  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const hexShortRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i;
  const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/i;

  let colorMatch: RegExpMatchArray | null;
  let rgbaColor: RGBAColor | null = null;

  if ((colorMatch = color.match(hexRegex))) {
    // 完整的十六进制颜色格式
    const red = parseInt(colorMatch[1], 16);
    const green = parseInt(colorMatch[2], 16);
    const blue = parseInt(colorMatch[3], 16);

    rgbaColor = { red, green, blue, alpha: 1 };
  } else if ((colorMatch = color.match(hexShortRegex))) {
    // 缩写的十六进制颜色格式
    const red = parseInt(colorMatch[1] + colorMatch[1], 16);
    const green = parseInt(colorMatch[2] + colorMatch[2], 16);
    const blue = parseInt(colorMatch[3] + colorMatch[3], 16);

    rgbaColor = { red, green, blue, alpha: 1 };
  } else if ((colorMatch = color.match(rgbRegex))) {
    // RGB 颜色格式
    const red = parseInt(colorMatch[1], 10);
    const green = parseInt(colorMatch[2], 10);
    const blue = parseInt(colorMatch[3], 10);

    rgbaColor = { red, green, blue, alpha: 1 };
  } else if ((colorMatch = color.match(rgbaRegex))) {
    // RGBA 颜色格式
    const red = parseInt(colorMatch[1], 10);
    const green = parseInt(colorMatch[2], 10);
    const blue = parseInt(colorMatch[3], 10);
    const alpha = parseFloat(colorMatch[4]);

    rgbaColor = { red, green, blue, alpha };
  }

  return rgbaColor;
}

export const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`;

interface RGBAColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export function calculateOpacity(
  color: string,
  opacity: number,
  calcMethod: boolean = false,
): string {
  const rgbaColor = parseColor(color);

  if (!rgbaColor) {
    console.error('Invalid color format');
    return color;
  }
  // 将透明度值限制在 0 到 1 之间
  const validOpacity = Math.max(0, Math.min(1, opacity));

  // 计算实际透明度
  const actualOpacity = calcMethod
    ? validOpacity * rgbaColor.alpha
    : validOpacity;

  // 构建带有新透明度的 RGBA 格式字符串
  const newColor = `rgba(${rgbaColor.red}, ${rgbaColor.green}, ${rgbaColor.blue}, ${actualOpacity})`;

  return newColor;
}
