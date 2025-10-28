import express from 'express';
import { createServer, context, reddit } from '@devvit/web/server';
import { media } from '@devvit/media';
import { saveHidingSpot, getHidingSpot } from './core/storage';
import { v4 as uuidv4 } from 'uuid';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());

const router = express.Router();

router.post('/api/hiding-spot', (req, res) => {
  const { gameId, x, y } = req.body;
  if (!gameId || x === undefined || y === undefined) {
    return res.status(400).json({ error: 'gameId, x, and y are required.' });
  }
  saveHidingSpot(gameId, { x, y });
  res.status(200).json({ success: true });
});

router.get('/api/hiding-spot', (req, res) => {
  const { gameId } = req.query;
  if (typeof gameId !== 'string') {
    return res.status(400).json({ error: 'gameId is required.' });
  }
  const spot = getHidingSpot(gameId);
  if (spot) {
    res.json(spot);
  } else {
    res.status(404).json({ error: 'Hiding spot not found.' });
  }
});

router.post('/api/share', async (req, res) => {
  const { imageData, hidingSpot } = req.body;
  if (!imageData || !hidingSpot) {
    return res.status(400).json({ error: 'imageData and hidingSpot are required.' });
  }

  try {
    const { subredditName } = context;
    if (!subredditName) {
      throw new Error('subredditName is required');
    }

    const gameId = uuidv4();
    saveHidingSpot(gameId, hidingSpot);

    const imageUrl = await media.upload({
      url: imageData,
      type: 'png',
    });

    const post = await reddit.submitPost({
      subredditName,
      title: 'Where am I?',
      url: imageUrl,
    });

    res.json({
      success: true,
      postUrl: `https://www.reddit.com${post.permalink}`,
    });
  } catch (error) {
    console.error('Error sharing post:', error);
    res.status(500).json({ error: 'Failed to share post.' });
  }
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = process.env.WEBBIT_PORT || 3000;

if (process.env.NODE_ENV === 'test') {
  app.listen(port, () => console.log(`http://localhost:${port}`));
} else {
  const server = createServer(app);
  server.on('error', (err) => console.error(`server error; ${err.stack}`));
  server.listen(port, () => console.log(`http://localhost:${port}`));
}
