import * as mongoose from 'mongoose';

const Unlocks = new mongoose.Schema({
  achievementId: String,
  imageId: String,
});

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  unlocks: [Unlocks],
});
