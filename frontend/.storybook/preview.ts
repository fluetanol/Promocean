import type { Preview } from '@storybook/react';
import '../src/app/globals.css'; // Tailwind CSS import

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;