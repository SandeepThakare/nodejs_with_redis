import { request } from 'https';
import { pbkdf2 } from 'crypto';
import { readFile } from 'fs';
process.env.UV_THREADPOOL_SIZE = 1;
const start = Date.now();
// console.log(Date.now());

function doRequest() {
	request('https://www.google.com', res => {

		res.on('data', () => { });
		res.on('end', () => {
			console.log('Request: ', Date.now() - start);
		});
	}).end();
}

function doHash() {
	const start = Date.now();
	pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
		console.log('Hash: ', Date.now() - start);
	});
}

doRequest();

readFile('multitask.js', 'utf8', () => {
	console.log('FS: ', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();