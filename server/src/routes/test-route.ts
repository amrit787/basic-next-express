import express from 'express';
import catchAsync from '../lib/catch-aync';
import { getTest } from '../controllers/test-controller';

const router = express.Router({ mergeParams: true });

router.route('/').get(getTest);

export default router;
