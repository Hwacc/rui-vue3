export { default as Progress } from './Progress.vue';
export { default as CircleProgress } from './CircleProgress.vue';

export const progressClass = [
  'relative',
  'h-1.5',
  'w-full',
  'overflow-hidden',
  'rounded-full',
  'bg-rz-green/30',
];

export const progressIndicatorClass = [
  'h-full',
  'w-full',
  'flex-1',
  'rounded-full',
  'transition-all',
  'data-[type=default]:bg-progress-indicator-default',
  'data-[type=robbin]:progress-indicator-robbin',
];
