export { default as Collapsible } from './Collapsible.vue';
export { default as CollapsibleContent } from './CollapsibleContent.vue';
export { default as CollapsibleTrigger } from './CollapsibleTrigger.vue';
export { default as ReadMore } from './ReadMore.vue';

export const collapsibleContentClass = [
  'overflow-hidden',
  'transition-all',
  'data-[state=closed]:animate-collapsible-up',
  'data-[state=open]:animate-collapsible-down',
];

export const readMoreRootClass = ['relative'];
export const readMoreContentClass = [
  'overflow-hidden',
  'max-h-(--reka-readmore-max-height)',
  'transition-[max-height]',
];

export const readMoreTriggerClass = [
  'absolute',
  'bottom-0',
  'right-0',
  'cursor-pointer',
  'pl-[2.5rem]',
  'bg-linear-[90deg,transparent_0%,var(--color-h1a)_27%]',
];
