import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() },
});

export const Leaderboard = model('Leaderboard', leaderboardSchema);
