import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run test:e2e',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  projects: [
    {
      name: 'client',
      testMatch: /.*.spec.ts/,
      use: {
        baseURL: 'http://localhost:5173',
      },
    },
    {
      name: 'api',
      testMatch: /.*api.spec.ts/,
      use: {
        baseURL: 'http://localhost:3000',
      },
    },
  ],
});
