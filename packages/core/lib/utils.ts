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
  const spacing = parseFloat(getCssVar('--spacing') ?? '.25rem');
  return times * rem2px(spacing);
};

export const getNodeCssVar = <T>(
  node: HTMLElement | null | undefined,
  variableName: string,
  fallback?: T
) => {
  if (!node) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName) || fallback;
  }
  return getComputedStyle(node).getPropertyValue(variableName) || fallback;
};

export const getCssVar = (variableName: string, fallback?: string) => {
  return getNodeCssVar(document.documentElement, variableName, fallback);
};

export const getCssColor = (colorName: string, fallback?: string) => {
  return getCssVar(`--color-${colorName}`, fallback);
};
