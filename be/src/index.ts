import express from 'express';
import cors from 'cors';
import { dpoEmergencies, dpoSeachStops, dpoStopTimes } from './dpo/dpo-api.js';
import Cache from './cache.js';
import { DpoStopGroupWithTrips } from './dpo/dpo-api.types.js';


const app = express();
const port = 8080;

app.use(cors({
	origin: '*',
}));
app.use(express.json());
app.get('/api/stops/search', async (req, res) => {
	const query = req.query.q;
	if (typeof query !== 'string') {
		res.status(400).send('Invalid query');
		return;
	}

	const data = await dpoSeachStops(query);
	res.json(data);
});

const stopCache = new Cache<DpoStopGroupWithTrips | undefined>(1000 * 60 * 45);
app.get('/api/stops/:id', async (req, res) => {
	const id = req.params.id;
	if (typeof id !== 'string') {
		res.status(400).send('Invalid ID');
		return;
	}
	const cachedData = stopCache.get(id);
	if (cachedData) {
		console.log(`Returning cached data for ${id}`);
		res.json(cachedData);
		return;
	}
	const data = await dpoStopTimes(id);
	stopCache.set(id, data);
	res.json(data);
});

app.get('/api/emergencies', async (req, res) => {
	const data = await dpoEmergencies();
	res.json(data);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
