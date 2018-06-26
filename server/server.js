'use strict';
import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import { json } from 'body-parser';
import { mongoURI, cookieKey } from '../config/keys';

import '../models/User';
import '../models/Blog';
import '../services/passport';
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useMongoClient: true });

const app = express();

app.use(json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('../routes/authRoutes').default(app);
require('../routes/blogRoutes').default(app);

if (['production'].includes(process.env.NODE_ENV)) {
	app.use('../client/build');

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Listening on port', PORT);
});
