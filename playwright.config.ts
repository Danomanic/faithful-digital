import { defineConfig, devices } from "@playwright/test";

const port = 4321;

export default defineConfig({
  testDir: "./tests",
  reporter: "list",
  use: { baseURL: `http://localhost:${port}` },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `node scripts/serve-out.mjs ${port}`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: true,
  },
});
