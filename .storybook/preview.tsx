import type { Preview } from '@storybook/react-vite';

import '../src/styles/index.scss';
import './preview.scss';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const disableThemeVariants = Boolean(context.parameters.themes?.disable);

      if (disableThemeVariants || context.viewMode === 'docs') {
        return <Story />;
      }

      return (
        <div className='sb-theme-grid'>
          <section className='sb-theme-panel' data-theme='light'>
            <p className='sb-theme-label'>Light theme</p>
            <div className='sb-theme-content'>
              <Story />
            </div>
          </section>

          <section className='sb-theme-panel' data-theme='dark'>
            <p className='sb-theme-label'>Dark theme</p>
            <div className='sb-theme-content'>
              <Story />
            </div>
          </section>
        </div>
      );
    }
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    themes: {
      disable: false
    }
  }
};

export default preview;
