if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'ci') {
	console.log('Inside CI ---------------------------->');
	module.exports = require('./ci');
} else {
	console.log('Inside dev ---------------------------->');
	module.exports = require('./dev');
}
