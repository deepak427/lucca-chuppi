import { test, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test('hiding spot API', async ({ request }) => {
  const gameId = uuidv4();
  const hidingSpot = { x: 100, y: 200 };

  // Save a hiding spot
  const postResponse = await request.post('/api/hiding-spot', {
    data: {
      gameId,
      ...hidingSpot,
    },
  });
  expect(postResponse.ok()).toBeTruthy();
  expect(await postResponse.json()).toEqual({ success: true });

  // Retrieve the hiding spot
  const getResponse = await request.get(`/api/hiding-spot?gameId=${gameId}`);
  expect(getResponse.ok()).toBeTruthy();
  expect(await getResponse.json()).toEqual(hidingSpot);
});
