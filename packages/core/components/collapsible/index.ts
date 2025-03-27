import { PREFIX } from '@/lib/constants';

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

const prefix = `${PREFIX}-readmore`;
export const readMoreRootClass = ['relative', `${prefix}-root`];
export const readMoreContentClass = [
  'overflow-hidden',
  'max-h-(--reka-readmore-max-height)',
  'transition-[max-height]',
  `${prefix}-content`,
];

export const readMoreTriggerClass = [
  'absolute',
  'bottom-0',
  'right-0',
  'pl-[2.5rem]',
  `${prefix}-trigger`,
];
