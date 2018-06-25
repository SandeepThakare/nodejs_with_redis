import { serializeUser, deserializeUser, use } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { model } from 'mongoose';
import { googleClientID, googleClientSecret } from '../config/keys';

const User = model('User');

serializeUser((user, done) => {
	done(null, user.id);
});

deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

use(
	new GoogleStrategy(
		{
			callbackURL: '/auth/google/callback',
			clientID: googleClientID,
			clientSecret: googleClientSecret,
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const existingUser = await User.findOne({ googleId: profile.id });
				if (existingUser) {
					return done(null, existingUser);
				}
				const user = await new User({
					googleId: profile.id,
					displayName: profile.displayName
				}).save();
				done(null, user);
			} catch (err) {
				done(err, null);
			}
		}
	)
);
