import { test, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test.describe('sharing', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the Devvit SDK
    await page.route('/api/share', async (route) => {
      const { imageData, hidingSpot } = route.request().postDataJSON();
      expect(imageData).toContain('data:image/png;base64,');
      expect(hidingSpot).toEqual({ x: 400, y: 300 });

      await route.fulfill({
        status: 200,
        json: {
          success: true,
          postUrl: 'https://www.reddit.com/r/Pixelary/comments/mock_post_id',
        },
      });
    });
  });

  test('sharing flow', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Click the "Play" button
    await page.locator('canvas').click({
      position: { x: 512, y: 614 },
    });

    // Click the "Map 1" card
    await page.locator('canvas').click({
      position: { x: 512, y: 384 },
    });

    // Place a hiding spot
    await page.locator('canvas').click({
      position: { x: 400, y: 300 },
    });

    // Click the share button
    await page.locator('canvas').click({
      position: { x: 512, y: 718 },
    });

    // Expect the button text to change to "Shared!"
    // This is a visual check, so we'll do it with a screenshot
    await expect(page).toHaveScreenshot();
  });
});
