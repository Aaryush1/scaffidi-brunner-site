import { defineConfig, devices } from '@playwright/test';

// Two projects: the firm's production build and the gift preview build.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: { trace: 'retain-on-failure' },
  projects: [
    {
      name: 'prod',
      testIgnore: /gift\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:4321' },
    },
    {
      name: 'gift',
      testMatch: /gift\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:4322' },
    },
  ],
  webServer: [
    { command: 'npx sirv dist --port 4321 --host 127.0.0.1 --quiet', port: 4321, reuseExistingServer: true },
    { command: 'npx sirv dist-gift --port 4322 --host 127.0.0.1 --quiet', port: 4322, reuseExistingServer: true },
  ],
});
