import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Workout } from '../models/Workout';
import { Leaderboard } from '../models/Leaderboard';

const MONGO_URI = 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  const users = await User.create([
    {
      name: 'Ava Brooks',
      email: 'ava.brooks@example.com',
      passwordHash: 'hashedpassword1',
    },
    {
      name: 'Noah Kim',
      email: 'noah.kim@example.com',
      passwordHash: 'hashedpassword2',
    },
    {
      name: 'Mia Patel',
      email: 'mia.patel@example.com',
      passwordHash: 'hashedpassword3',
    },
  ]);

  const teams = await Team.create([
    {
      name: 'OctoRunners',
      members: [users[0]._id, users[1]._id],
    },
    {
      name: 'FitSquad',
      members: [users[1]._id, users[2]._id],
    },
  ]);

  const workouts = await Workout.create([
    {
      name: 'Morning HIIT',
      focus: 'Cardio',
      durationMinutes: 30,
      difficulty: 'Intermediate',
    },
    {
      name: 'Strength Builder',
      focus: 'Strength',
      durationMinutes: 45,
      difficulty: 'Advanced',
    },
    {
      name: 'Recovery Stretch',
      focus: 'Flexibility',
      durationMinutes: 20,
      difficulty: 'Beginner',
    },
  ]);

  const activities = await Activity.create([
    {
      user: users[0]._id,
      type: 'Run',
      distanceKm: 10,
      durationMinutes: 55,
      caloriesBurned: 620,
      date: new Date('2026-06-10T07:30:00Z'),
    },
    {
      user: users[1]._id,
      type: 'Bike',
      distanceKm: 22,
      durationMinutes: 70,
      caloriesBurned: 780,
      date: new Date('2026-06-11T09:00:00Z'),
    },
    {
      user: users[2]._id,
      type: 'Yoga',
      distanceKm: 0,
      durationMinutes: 40,
      caloriesBurned: 220,
      date: new Date('2026-06-12T06:15:00Z'),
    },
  ]);

  const leaderboard = await Leaderboard.create([
    {
      user: users[1]._id,
      rank: 1,
      score: 1420,
    },
    {
      user: users[0]._id,
      rank: 2,
      score: 1345,
    },
    {
      user: users[2]._id,
      rank: 3,
      score: 1180,
    },
  ]);

  console.log('Seed data created:');
  console.log({
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    workouts: workouts.length,
    leaderboard: leaderboard.length,
  });

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
