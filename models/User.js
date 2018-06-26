import mongoose from 'mongoose';
// const { Schema } = mongoose;

const userSchema = mongoose.model('User', {
	googleId: String,
	displayName: String
});

export default userSchema;
// model('User', userSchema);
