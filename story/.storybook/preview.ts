import type { Preview } from '@storybook/vue3'
import '../styles/indes.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'Dark',
      values: [
        {
          name: 'Dark',
          value: '#111',
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
}

export default preview
