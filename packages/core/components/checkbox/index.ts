import { PREFIX } from '@/lib/constants';
import { cva, VariantProps } from 'class-variance-authority';

export { default as Checkbox } from './Checkbox.vue';
export { default as CheckboxGroup } from './CheckboxGroup.vue';

const prefix = `${PREFIX}-checkbox`;
export const checkboxLabelVariants = cva(['flex', 'items-center', 'gap-2.5', `${prefix}-root`], {
  variants: {
    disabled: {
      true: ['opacity-(--disabled-opacity)'],
    },
  },
});

export const checkboxVariants = cva(['peer', 'shrink-0', 'rounded-xs', 'border', prefix], {
  variants: {
    size: {
      default: ['size-3.5'],
      sm: ['size-3'],
      lg: ['size-4'],
    },
  },
});

export type CheckboxVariantsProps = VariantProps<typeof checkboxVariants>;
