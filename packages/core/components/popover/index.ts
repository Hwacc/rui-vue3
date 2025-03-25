export { default as Popover } from './Popover.vue';
export { default as PopoverContent } from './PopoverContent.vue';
export { default as PopoverTrigger } from './PopoverTrigger.vue';
export { default as PopoverArrow } from './PopoverArrow.vue';

export { PopoverAnchor } from 'reka-ui';

//@ts-ignore
export {u as useGraceArea} from '../../node_modules/reka-ui/dist/shared/useGraceArea.js';

export const popoverClass = [
  'z-50',
  'rounded',
  'min-w-(--reka-popover-trigger-width)',
  'border',
  'bg-h1a',
  'p-4',
  'shadow-md',
  'outline-none',
];
