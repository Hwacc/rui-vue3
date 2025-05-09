import { getCssVar } from "@rui/core/lib/utils"

export const useAnimationParams = () => {
  let twDuration = getCssVar('--tw-duration')
  let animationDuration = parseFloat(twDuration ?? '0.2')
  if (twDuration?.endsWith('ms')) {
    animationDuration = parseFloat(twDuration) / 1000
  }
  const animationEase =
    getCssVar('--tw-ease') ?? 'cubic-bezier(0.165, 0.84, 0.44, 1)'
  return { animationDuration, animationEase }
}
