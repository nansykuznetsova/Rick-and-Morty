import type { TestRunnerConfig } from '@storybook/test-runner';
import { screenshot } from '@storycap-testrun/node';

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.addStyleTag({
      content: `
        *,
        *::before,
        *::after {
          animation: none !important;
          transition: none !important;
        }
      `
    });
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() =>
      document.fonts ? document.fonts.status === 'loaded' : true
    );

    // Storycap сохраняет эталонные изображения в __screenshots__ по умолчанию.
    await screenshot(page, context, {});
  }
};

export default config;
