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

export function getNodeCssVar(node: HTMLElement | null | undefined, varName: string): string | undefined
export function getNodeCssVar(node: HTMLElement | null | undefined, varName: string, fallback: string): string
export function getNodeCssVar(node: HTMLElement | null | undefined, varName: string, fallback?: string): string | undefined {
  node = node ?? document.documentElement
  const value = getComputedStyle(node).getPropertyValue(varName).trim()
  if (value) return value
  return fallback !== undefined ? fallback : undefined
}

export function getCssVar(variableName: string, fallback?: string) {
  return getNodeCssVar(null, variableName, fallback ?? '')
}

export function getCssColor(colorName: string, fallback?: string) {
  return getCssVar(`--color-${colorName}`, fallback)
}
