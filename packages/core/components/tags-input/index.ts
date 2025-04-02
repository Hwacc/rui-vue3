import { cva, VariantProps } from '@/core/lib/cva';

export { default as TagsInput } from './TagsInput.vue';
export { default as TagsInputInput } from './TagsInputInput.vue';
export { default as TagsInputItem } from './TagsInputItem.vue';
export { default as TagsInputItemDelete } from './TagsInputItemDelete.vue';
export { default as TagsInputItemText } from './TagsInputItemText.vue';

export const tagsInputVariants = cva(
  ['flex', 'items-center', 'rounded-md', 'border', 'rounded', 'py-[.375rem]', 'px-2', 'gap-2'],
  {
    variants: {
      size: {
        default: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
      inline: {
        true: 'flex-wrap',
        false: 'flex-nowrap',
      },
    },
  },
  {
    className: ['rui-input', 'rui-tags-input'],
  }
);
export type TagsInputVariants = VariantProps<typeof tagsInputVariants>;

export const tagsInputInnerVariants = cva(
  ['focus:outline-none', 'flex-1', 'bg-transparent', 'min-w-5'],
  {
    variants: {
      size: {
        default: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
    },
  },
  {
    className: ['rui-input-inner', 'rui-tags-input-inner'],
  }
);
export type TagsInputInnerVariants = VariantProps<typeof tagsInputInnerVariants>;

export const tagsInputItemVariants = cva(
  ['flex', 'items-center', 'gap-1'],
  {
    variants: {
      size: {
        default: ['px-2'],
        sm: ['px-1.5'],
        lg: ['px-2.5'],
      },
    },
  },
  {
    className: 'rui-tags-input-item',
  }
);
export type TagsInputItemVariants = VariantProps<typeof tagsInputItemVariants>;

export const tagsInputItemTextVariants = cva(
  ['text-sm', 'bg-transparent'],
  {
    variants: {
      size: {
        default: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
    },
  },
  {
    className: 'rui-tags-input-item-text',
  }
);
export type TagsInputItemTextVariants = VariantProps<typeof tagsInputItemTextVariants>;
