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
  {
    className: `${prefix}-root`,
    compound: [
      {
        disableRuiClass: false,
        className: ['text-rui-checkbox-text', 'hover:text-rui-checkbox-text-hover'],
      },
      {
        disableRuiClass: false,
        disabled: true,
        className: 'hover:text-rui-checkbox-text',
      },
    ],
  }
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
  {
    className: prefix,
    compound: [
      {
        disableRuiClass: false,
        className: ['bg-rui-checkbox', 'border-rui-checkbox-border'],
      },
      {
        disableRuiClass: false,
        disabled: false,
        className: [
          ,
          'hover:border-rui-checkbox-border-hover',
          'focus:border-rui-checkbox-border-focus',
          'active:bg-rui-checkbox-active',
          'active:border-rui-checkbox-active',
          'data-[state=checked]:bg-rui-checkbox-checked',
          'data-[state=checked]:border-rui-checkbox-border-checked',
          'data-[state=indeterminate]:bg-rui-checkbox-checked',
          'data-[state=indeterminate]:border-rui-checkbox-border-checked',
        ],
      },
    ],
  }
);

export type CheckboxVariantsProps = VariantProps<typeof checkboxVariants>;
