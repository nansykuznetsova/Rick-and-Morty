import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

const openInputStory = async (storyId: string, page: Page) => {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`, {
    waitUntil: 'networkidle'
  });
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() =>
    document.fonts ? document.fonts.status === 'loaded' : true
  );
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
};

test.describe('Input visual', () => {
  test('Underlined is correct', async ({ page }) => {
    await openInputStory('shared-input--underlined', page);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('./__screenshots__/underlined.png', {
      animations: 'disabled',
      caret: 'hide'
    });
  });

  test('Bordered is correct', async ({ page }) => {
    await openInputStory('shared-input--bordered', page);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('./__screenshots__/bordered.png', {
      animations: 'disabled',
      caret: 'hide'
    });
  });

  test('WithIcon is correct', async ({ page }) => {
    await openInputStory('shared-input--with-icon', page);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('./__screenshots__/with-icon.png', {
      animations: 'disabled',
      caret: 'hide'
    });
  });

  test('WithValue is correct', async ({ page }) => {
    await openInputStory('shared-input--with-value', page);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('./__screenshots__/with-value.png', {
      animations: 'disabled',
      caret: 'hide'
    });
  });
});
