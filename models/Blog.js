import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = mongoose.model('Blog', {
	title: String,
	content: String,
	createdAt: { type: Date, default: Date.now },
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default blogSchema;
// model('Blog', blogSchema);
	