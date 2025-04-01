import { PREFIX } from '@/lib/constants';
import { VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';

export { default as Checkbox } from './Checkbox.vue';
export { default as CheckboxGroup } from './CheckboxGroup.vue';

const prefix = `${PREFIX}-checkbox`;
export const checkboxLabelVariants = cva(
  ['flex', 'items-center', 'gap-2.5'],
  {
    variants: {
      disabled: {
        true: ['opacity-(--disabled-opacity)'],
      },
    },
  },
  { className: `${prefix}-root` }
);

export const checkboxVariants = cva(
  ['peer', 'shrink-0', 'rounded-xs', 'border'],
  {
    variants: {
      size: {
        default: ['size-3.5'],
        sm: ['size-3'],
        lg: ['size-4'],
      },
      disabled: {
        true: '',
      },
    },
  },
  { className: prefix }
);

export type CheckboxVariantsProps = VariantProps<typeof checkboxVariants>;
