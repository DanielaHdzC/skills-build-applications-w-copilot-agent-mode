import { Router } from 'express';
import { Team } from '../models/Team';

const router = Router();

router.get('/', async (req, res) => {
  const teams = await Team.find().populate('members', 'name email').lean();
  res.json({ teams });
});

export default router;
