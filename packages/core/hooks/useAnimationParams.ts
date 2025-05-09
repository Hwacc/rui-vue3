import { getCssVar } from '@rui/core/lib/utils'

export function useAnimationParams() {
  const twDuration = getCssVar('--tw-duration')
  let animationDuration = Number.parseFloat(twDuration ?? '0.2')
  if (twDuration?.endsWith('ms')) {
    animationDuration = Number.parseFloat(twDuration) / 1000
  }
  const animationEase
    = getCssVar('--tw-ease') ?? 'cubic-bezier(0.165, 0.84, 0.44, 1)'
  return { animationDuration, animationEase }
}
