import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function px2rem(px: number) {
  const base = parseFloat(window.getComputedStyle(document.documentElement).fontSize || '16px')
  return px / base
}

export function rem2px(rem: number) {
  const base = parseFloat(window.getComputedStyle(document.documentElement).fontSize || '16px')
  return rem * base
}

export function spaceTimes(times: number) {
  const spacing = parseFloat(getCssVar('--spacing') ?? '.25rem')
  return times * rem2px(spacing)
}

export function getNodeCssVar<T>(node: HTMLElement | null | undefined, variableName: string, fallback?: T) {
  if (!node) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName) || fallback
  }
  return getComputedStyle(node).getPropertyValue(variableName) || fallback
}

export function getCssVar(variableName: string, fallback?: string) {
  return getNodeCssVar(null, variableName, fallback)
}

export function getCssColor(colorName: string, fallback?: string) {
  return getCssVar(`--color-${colorName}`, fallback)
}
