import express from 'express';
import cluster from 'cluster';
const app = express();

//Check the file being executed in master mode
if (cluster.isMaster) {
	console.log(cluster.isMaster);
	//cause the server.js executed again but in child mode
	cluster.fork();
} else {
	//run in child mode
	console.log(cluster.isMaster);
	app.get('/', (req, res) => {
		res.send('hi there !!!');
	});

	app.listen(3000);

	console.log('Now listen on port http://localhost:3000');
}   