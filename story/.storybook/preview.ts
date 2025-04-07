import type { Preview } from '@storybook/vue3';
import '../styles/indes.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'Light',
      values: [
        {
          name: 'Dark',
          value: '#000',
        },
        {
          name: 'Light',
          value: '#fff',
        },
      ],
    },
    layout: 'centered',
    docs: {
      controls: {
        exclude: ['class'],
      },
    },
    tags: ['autodocs'],
  },
};

export default preview;
