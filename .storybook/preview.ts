import type { Preview } from "@storybook/nextjs";
import "../app/styles/globals.css";
import '../app/styles/pipelinecrm.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
