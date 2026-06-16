import { Router } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

router.get('/', async (req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ workouts });
});

export default router;
