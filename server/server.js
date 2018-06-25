import express from 'express';
import cluster from 'cluster';
const app = express();

//run in child mode
console.log(cluster.isMaster);
app.get('/', (req, res) => {
	res.send('hi there !!!');
});
    
app.get('/hi', (req, res) => {
	res.send('this is very fast !!!');
});

app.listen(3000);

console.log('Now listen on port http://localhost:3000');