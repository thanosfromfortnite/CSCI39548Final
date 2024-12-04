import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/', async (req, res) => {
	res.send("Test");
})

app.listen(PORT, () => {
	console.log(`ExpressJS server listening on port ${PORT}`);
})