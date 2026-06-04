import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

const openSelectStory = async (storyId: string, page: Page) => {
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

test.describe('Select visual', () => {
  test('Large is correct', async ({ page }) => {
    await openSelectStory('shared-select--large', page);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('./__screenshots__/large.png', {
      animations: 'disabled',
      caret: 'hide'
    });
  });

  test('Small is correct', async ({ page }) => {
    await openSelectStory('shared-select--small', page);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('./__screenshots__/small.png', {
      animations: 'disabled',
      caret: 'hide'
    });
  });

  test('SmallSelected is correct', async ({ page }) => {
    await openSelectStory('shared-select--small-selected', page);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('./__screenshots__/small-selected.png', {
      animations: 'disabled',
      caret: 'hide'
    });
  });

  test('WithCustomOptionRenderer is correct', async ({ page }) => {
    await openSelectStory('shared-select--with-custom-option-renderer', page);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot(
      './__screenshots__/with-custom-option-renderer.png',
      {
        animations: 'disabled',
        caret: 'hide'
      }
    );
  });
});
