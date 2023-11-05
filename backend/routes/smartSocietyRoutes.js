import express from 'express';
import * as smartSocietyController from '../controllers/smartSocietyController';

const router = express.Router();

router.get('/news', smartSocietyController.getNews);
router.post('/news', smartSocietyController.postMessage);
router.get('/events', smartSocietyController.getEvents);

export default router;
