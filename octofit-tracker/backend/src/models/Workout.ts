import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export const Workout = model('Workout', workoutSchema);
