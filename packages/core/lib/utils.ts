import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const px2rem = (px: number) => {
  const base = parseFloat(window.getComputedStyle(document.documentElement).fontSize || '16px');
  return px / base;
};

export const rem2px = (rem: number) => {
  const base = parseFloat(window.getComputedStyle(document.documentElement).fontSize || '16px');
  return rem * base;
};

export const spaceTimes = (times: number) => {
  const spacing = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--spacing') || '.25rem'
  );
  return times * rem2px(spacing);
};

export const getCssVar = <T>(variableName: string, fallback?: T) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName) || fallback;
};

export const getCssColor = (colorName: string, fallback?: string) => {
  return getCssVar(`--color-${colorName}`, fallback);
};
