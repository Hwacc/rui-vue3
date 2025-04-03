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
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000',
        },
        {
          name: 'light',
          value: '#fff',
        },
      ],
    },
  },
};

export default preview;
