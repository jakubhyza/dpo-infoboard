import express from 'express';
import { dpoSeachStops, dpoStopTimes } from './dpo/dpo-api.js';

const app = express();
const port = 8080;

app.use(express.json());
app.get('/api/stops/search', async (req, res) => {
	const query = req.query.q;
	if (typeof query !== 'string') {
		res.status(400).send('Invalid query');
		return;
	}
	const data = await dpoSeachStops(query);
	return res.json(data);
});

app.get('/api/stops/:id', async (req, res) => {
	const id = req.params.id;
	if (typeof id !== 'string') {
		res.status(400).send('Invalid ID');
		return;
	}
	const data = await dpoStopTimes(id);
	return res.json(data);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
