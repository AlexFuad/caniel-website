import express from 'express';

const router = express.Router();

// Placeholder routes for future API endpoints
router.get('/', (req, res) => {
  res.json({
    message: 'API endpoints',
    version: '1.0.0'
  });
});

export default router;
