import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'], // public 폴더 에셋 사용
};

export default config;