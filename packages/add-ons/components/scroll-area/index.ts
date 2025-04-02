import { cva } from '@/core/lib/cva';

// import ps css
import './style.css';

export { default as ScrollArea } from './ScrollArea.vue';

export const scrollAreaVariants = cva(
  ['relative'],
  {
    variants: {
      size: {
        default: '',
        small: '',
        tiny: '',
      },
    },
  },
  {
    className: 'rui-ps-scroll-area',
  }
);
