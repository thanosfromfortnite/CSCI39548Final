import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;
const tradeableItems = [];

// Test if WeirdGloop is online.
app.get('/', async (req, res) => {
	await fetch('https://api.weirdgloop.org/')
	.then(() => {
		res.send("All good!");
	})
	.catch((e) => {
		res.send('Weird Gloop API is down!');
	});
})

// Get a list of every item tradeable on the market, OSRSBox
app.get('/ge-items', (req, res) => {
	console.log('GET /ge-items/ request received.');
	res.status(200);
	res.send(tradeableItems);
});

// Get the 90 day history of an item by name, Weird Gloop
app.get('/pricehistory/:name', (req, res) => {
	const itemName = encodeURIComponent(req.params.name);
	console.log('GET /pricehistory/:name request received.', itemName);
	const url = 'https://api.weirdgloop.org/exchange/history/osrs/last90d?name=' + itemName + '&lang=en&compress=false';
	console.log(url);
	fetch(url)
	.then(data => {
		if (data.status == 200) {
			return data.json();
		}
		res.status(400);
		res.send("");
	})
	.then(json => {
		if (typeof (json.success) != 'undefined') {
			res.status(400);
			res.send("Invalid item name");
		}
		else {
			res.status(200);
			let out = {
				name: req.params.name,
				timestamps: [],
				prices: [],
				volumes: []
			};
			for (let i = 0; i < json[req.params.name].length; i ++) {
				out.timestamps.push(new Date(json[req.params.name][i].timestamp));
				out.prices.push(json[req.params.name][i].price);
				out.volumes.push(json[req.params.name][i].volume);
			}
			res.send(out);
		}
	})
	.catch((e) => {
		console.log(e);
	});
});

app.listen(PORT, async () => {
	console.log(`ExpressJS server listening on port ${PORT}`);
	
	if (tradeableItems.length <= 0) {
		console.log("Populating list of items...");
		const url = 'https://raw.githubusercontent.com/osrsbox/osrsbox-db/refs/heads/master/data/items/items-cache-data.json';
		const data = await fetch(url);
		const json = await data.json();
		for (const [key, value] of Object.entries(json)) {
			if (value.tradeable_on_ge) {
				const item = {
					id: value.id,
					name: value.name,
					ha: value.highalch
				};
				tradeableItems.push(item);
			}
		}
		console.log("Done populating with " + tradeableItems.length + " items.");
	}
})