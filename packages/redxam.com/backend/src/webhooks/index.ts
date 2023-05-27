import express from 'express';
import stripeWebhook from './stripe';
import leanWebhook from './lean';

const router = express.Router();

router.post('/stripe', stripeWebhook);
router.post('/lean', leanWebhook);

export default router;
