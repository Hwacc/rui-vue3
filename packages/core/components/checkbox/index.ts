import { cva, VariantProps } from 'class-variance-authority';

export { default as Checkbox } from './Checkbox.vue';
export { default as CheckboxGroup } from './CheckboxGroup.vue';

export const checkboxLabelVariants = cva(
  ['flex', 'items-center', 'gap-2.5', 'text-hcc', 'hover:text-hff'],
  {
    variants: {
      disabled: {
        true: ['opacity-30', 'hover:text-hcc'],
      },
    },
  }
);

export const checkboxVariants = cva(
  [
    'peer',
    'shrink-0',
    'rounded-xs',
    'border',
    'border-h55',
    'hover:border-rz-green',
    'bg-transparent',
    'active:border-rz-green-dark-hover',
    'active:bg-rz-green-dark-hover',
    'data-[state=checked]:bg-rz-green',
    'data-[state=checked]:border-rz-green',
    'data-[state=indeterminate]:bg-rz-green',
    'data-[state=indeterminate]:border-rz-green',
    'disabled:hover:border-h55',
    'disabled:active:bg-transparent'
  ],
  {
    variants: {
      size: {
        default: ['size-3.5'],
        sm: ['size-3'],
        lg: ['size-4'],
      },
    },
  }
);

export type CheckboxVariantsProps = VariantProps<typeof checkboxVariants>;
