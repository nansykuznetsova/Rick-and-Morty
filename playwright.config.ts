import { defineConfig, devices } from '@playwright/test';

const storybookServer = {
  command: 'npm run storybook -- --ci --host 127.0.0.1',
  url: 'http://127.0.0.1:6006',
  reuseExistingServer: !process.env.CI
};

const appServer = {
  command: 'npm run dev -- --host 127.0.0.1 --port 4173',
  url: 'http://127.0.0.1:4173',
  reuseExistingServer: !process.env.CI
};

const runTarget = process.env.PW_TARGET;
const selectedWebServer =
  runTarget === 'e2e'
    ? appServer
    : runTarget === 'storybook'
      ? storybookServer
      : [storybookServer, appServer];

export default defineConfig({
  testMatch: '*.spec.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    viewport: { width: 1280, height: 720 },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'storybook-chromium',
      testMatch: /src\/shared\/ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://127.0.0.1:6006'
      }
    },
    {
      name: 'e2e-chromium',
      testMatch: /tests\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://127.0.0.1:4173'
      }
    }
  ],

  /* Run your local dev server before starting the tests */
  webServer: selectedWebServer
});
