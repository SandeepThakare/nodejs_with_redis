import { Worker } from 'webworker-threads';
import express from 'express';
// import cluster from 'cluster';
const app = express();

app.get('/', (req, res) => {
    
	const worker = new Worker( function() {
		this.onmessage = function() {

			let counter = 0;

			while(counter < 1e9) {
				counter++;
			}

			postMessage(counter);
		};
	});
    
	worker.onmessage = function(myCounter) {
		console.log(myCounter);
		res.send('' + myCounter.data);
	};

	worker.postMessage();
});
    
app.listen(3000);

console.log('Now listen on port http://localhost:3000');