
import mongoose from 'mongoose';

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function() {
	console.log('Im about to run query');
    
	console.log(this.getQuery());

	return exec.apply(this, arguments);
};