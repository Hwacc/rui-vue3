import { PREFIX } from '@rui/core/lib/constants';
import { cva } from '@rui/core/lib/cva';

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

export const readMoreRootVariant = cva(['relative'], undefined , {
  className: `${prefix}-root`,
});

export const readMoreContentVariant = cva(
  ['overflow-hidden', 'max-h-(--reka-readmore-max-height)', 'transition-[max-height]'],
  undefined,
  {
    className: `${prefix}-content`,
  }
);

export const readMoreTriggerVariant = cva(
  ['absolute', 'bottom-0', 'right-0', 'pl-[2.5rem]'],
  undefined,
  {
    className: `${prefix}-trigger`,
  }
);
