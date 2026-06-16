import { Router } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

router.get('/', async (req, res) => {
  const activities = await Activity.find().populate('user', 'name email').lean();
  res.json({ activities });
});

export default router;
