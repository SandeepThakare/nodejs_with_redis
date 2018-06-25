import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	displayName: String
});

model('User', userSchema);
