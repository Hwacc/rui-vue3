import type { VariantProps } from 'tailwind-variants';
import { PREFIX } from '@rui/core/lib/constants';
import { tv } from '@rui/core/lib/tv';
import { tvInput } from '../input';

export { default as Hotkey } from './Hotkey.vue';

const prefix = `${PREFIX}-hotkey`;

const { base: inputBase, inner: inputInner } = tvInput();
export const tvHotkey = tv(
  {
    slots: {
      base: [inputBase(), 'relative'],
      inner: [inputInner()],
    },
    variants: {
      size: {
        base: '',
        sm: '',
        lg: '',
      },
    },
    defaultVariants: { size: 'base' },
    compoundSlots: [
      {
        slots: ['base'],
        size: 'base',
        class: inputBase({ size: 'base' }),
      },
      {
        slots: ['base'],
        size: 'sm',
        class: inputBase({ size: 'sm' }),
      },
      {
        slots: ['base'],
        size: 'lg',
        class: inputBase({ size: 'lg' }),
      },
      {
        slots: ['inner'],
        size: 'base',
        class: inputInner({ size: 'base' }),
      },
      {
        slots: ['inner'],
        size: 'sm',
        class: inputInner({ size: 'sm' }),
      },
      {
        slots: ['inner'],
        size: 'lg',
        class: inputInner({ size: 'lg' }),
      },
    ],
  },
  {
    slots: {
      base: [`${PREFIX}-input`, prefix],
      inner: [`${PREFIX}-input-inner`, `${prefix}-inner`],
    },
  }
);
export type HotkeyVariants = VariantProps<typeof tvHotkey>;
