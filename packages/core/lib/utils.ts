import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { camelCase } from 'lodash-es'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function px2rem(px: number | string) {
  if (typeof px === 'string') {
    if (px.endsWith('rem')) return parseFloat(px)
    else px = parseFloat(px)
  }
  if (!px) px = 0
  const base = parseFloat(
    window.getComputedStyle(document.documentElement).fontSize || '16px'
  )
  return px / base
}

export function rem2px(rem: number | string) {
  if (typeof rem === 'string') {
    if (rem.endsWith('px')) return parseFloat(rem)
    else {
      rem = parseFloat(rem)
    }
  }
  if (!rem) rem = 0
  const base = parseFloat(
    window.getComputedStyle(document.documentElement).fontSize || '16px'
  )
  return rem * base
}

export function spaceTimes(times: number) {
  const spacing = parseFloat(getCssVar('--spacing') ?? '.25rem')
  return times * rem2px(spacing)
}

export function getNodeCssVar(
  node: HTMLElement | null | undefined,
  varName: string
): string | undefined
export function getNodeCssVar(
  node: HTMLElement | null | undefined,
  varName: string,
  fallback: string
): string
export function getNodeCssVar(
  node: HTMLElement | null | undefined,
  varName: string,
  fallback?: string
): string | undefined {
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

export function parseCubicBezier(bezierString: string): [number, number, number, number] {
  const matches = bezierString.match(/cubic-bezier\(([^)]+)\)/);
  if (!matches || !matches[1]) {
    return camelCase(bezierString) as any;
  }
  const values = matches[1].split(/\s*,\s*/).map(Number);
  if (values.length !== 4 || values.some(isNaN)) {
    throw new Error('Invalid cubic-bezier values. Expected four numbers.');
  }
  return values as [number, number, number, number];
}

export function getSiblings(el: HTMLElement) {
  return [...el.parentNode?.children ?? []].filter((node) => node !== el)
}
