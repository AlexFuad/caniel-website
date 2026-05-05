import express from 'express';
import healthRoutes from './health.routes.js';
import apiRoutes from './api.routes.js';

const router = express.Router();

router.use('/', healthRoutes);
router.use('/api', apiRoutes);

export default router;
