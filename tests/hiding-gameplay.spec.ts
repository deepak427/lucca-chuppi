import { test, expect } from '@playwright/test';

test('hiding gameplay', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Click the "Play" button by its coordinates
  await page.locator('canvas').click({
    position: { x: 512, y: 614 },
  });

  // Click the "Map 1" card by its coordinates
  await page.locator('canvas').click({
    position: { x: 512, y: 384 },
  });

  // Click on the map to place a hiding spot
  await page.locator('canvas').click({
    position: { x: 400, y: 300 },
  });

  // Take a screenshot to verify the hiding spot and share button
  await expect(page).toHaveScreenshot();
});
