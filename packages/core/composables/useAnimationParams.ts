import { getCssVar, parseCubicBezier } from '@rui/core/lib/utils';

export function useAnimationParams() {
  const twDuration = getCssVar('--tw-duration');
  let duration = Number.parseFloat(twDuration ?? '0.2');
  if (twDuration?.endsWith('ms')) {
    duration = Number.parseFloat(twDuration) / 1000;
  }
  const ease = getCssVar('--tw-ease', 'cubic-bezier(0.165, 0.84, 0.44, 1)');

  return {
    duration,
    ease: parseCubicBezier(ease),
  };
}
