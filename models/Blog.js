import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
	title: String,
	content: String,
	createdAt: { type: Date, default: Date.now },
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

model('Blog', blogSchema);