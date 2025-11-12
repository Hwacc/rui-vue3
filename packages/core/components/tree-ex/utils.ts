import type { TreeNodeKeyType } from './core/types'
import type { VModelType } from './interface'

export function sameValue(source: VModelType, target: VModelType | undefined): boolean {
  if (Array.isArray(source) && Array.isArray(target)) {
    if (
      source.length === target.length
      && source.every(val => (target as TreeNodeKeyType[]).includes(val))
    ) {
      return true
    }
  }
  else if (source === target) {
    return true
  }
  return false
}
