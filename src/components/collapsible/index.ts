import { cva, VariantProps } from 'class-variance-authority';

export { default as Collapsible } from './Collapsible.vue';
export { default as CollapsibleContent } from './CollapsibleContent.vue';
export { default as CollapsibleTrigger } from './CollapsibleTrigger.vue';
export { default as ReadMore } from './ReadMore.vue';

export const collapsibleVariants = cva([], {
  variants: {},
});
export type CollapsibleVariants = VariantProps<typeof collapsibleVariants>;

export const collapsibleContentVariants = cva(
  [
    'overflow-hidden',
    'transition-all',
    'data-[state=closed]:animate-collapsible-up',
    'data-[state=open]:animate-collapsible-down',
  ],
  {
    variants: {},
  }
);
export type CollapsibleContentVariants = VariantProps<typeof collapsibleContentVariants>;

export const collapsibleTriggerVariants = cva([], {
  variants: {},
});
export type CollapsibleTriggerVariants = VariantProps<typeof collapsibleTriggerVariants>;


export const readMoreRootVariants = cva(['relative']);
export type ReadMoreVariants = VariantProps<typeof readMoreRootVariants>;

export const readMoreContentVariants = cva(['overflow-hidden']);
export type ReadMoreContentVariants = VariantProps<typeof readMoreContentVariants>;

export const readMoreTriggerVariants = cva(
  [
    'absolute',
    'bottom-0',
    'right-0',
    'cursor-pointer',
    'pl-[2.5rem]',
    'bg-linear-[90deg,transparent_0%,var(--color-h1a)_27%]',
  ],
  {
    variants: {},
  }
);
export type ReadMoreTriggerVariants = VariantProps<typeof readMoreTriggerVariants>;
