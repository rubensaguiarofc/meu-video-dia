import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Video from '../models/Video.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    const todays = await Video.find({
      date: { $gte: today, $lt: tomorrow }
    }).lean();

    const todaysActive = await Video.findOne({
      date: { $gte: today, $lt: tomorrow },
      isActive: true
    }).lean();

    const actives = await Video.find({ isActive: true }).sort({ date: -1 }).lean();
    const fallbackActive = await Video.findOne({ isActive: true }).sort({ date: -1 }).lean();

    console.log('Today range:', today.toISOString(), '->', tomorrow.toISOString());
    console.log('Today videos:', todays.map(v => ({ title: v.title, date: v.date, isActive: v.isActive })));
    console.log('Today active (single):', todaysActive);
    console.log('Active videos:', actives.map(v => ({ title: v.title, date: v.date, isActive: v.isActive })));
    const simulatedResponse = todaysActive || fallbackActive;
    console.log('Fallback active (single):', fallbackActive);
    console.log('Route would return:', simulatedResponse?.title || null);
  } catch (error) {
    console.error('Debug script error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
