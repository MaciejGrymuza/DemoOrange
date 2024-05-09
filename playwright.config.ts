import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    trace: 'retain-on-failure',
    headless: true,
    screenshot: 'only-on-failure',
  },
  expect: {
    timeout: 10000,
    toMatchSnapshot: {
        threshold: 0.2,
        maxDiffPixelRatio: 0.02,
    },
    toHaveScreenshot: {
        maxDiffPixels: 300,
        threshold: 0.2,
        maxDiffPixelRatio: 0.1,
        animations: 'disabled',
    }
  },
  projects: [
    {
      name:'firefox',
      use: {... devices['Desktop Firefox']}
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
  timeout: 30000,
  globalTimeout: 600000,
});
