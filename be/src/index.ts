import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import Cache from './cache.js';
import { dpoEmergencies, dpoSeachStops, dpoStopTimes } from './dpo/dpo-api.js';
import { DpoStopGroupWithTrips } from './dpo/dpo-api.types.js';

const port = 8080;
const app = express();
const prisma = new PrismaClient();

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



// Database managament

app.get('/api/signs/:id', async (req, res) => {
	const id = req.params.id;
	if (typeof id !== 'string') {
		res.status(400).send('Invalid ID');
		return;
	}
	const data = await prisma.infoboard.findUnique({
		where: {
			id,
		},
	});
	if (!data) {
		res.status(404).send('Not found');
		return;
	}
	res.json(data);
});

app.delete('/api/signs/:id', async (req, res) => {
	const id = req.params.id;
	if (typeof id !== 'string') {
		res.status(400).send('Invalid ID');
		return;
	}
	const data = await prisma.infoboard.delete({
		where: {
			id,
		},
	});
	res.json(data);
});

app.post('/api/signs/:id', async (req, res) => {
	const id = req.params.id;
	if (typeof id !== 'string') {
		res.status(400).send('Invalid ID');
		return;
	}
	const data = req.body;
	if (!data) {
		res.status(400).send('Invalid data');
		return;
	}
	const result = await prisma.infoboard.update({
		where: {
			id,
		},
		data,
	});
	res.json(result);
});

app.get('/api/signs', async (req, res) => {
	const data = await prisma.infoboard.findMany();
	res.json(data);
});

app.post('/api/signs', async (req, res) => {
	const data = req.body;
	if (!data) {
		res.status(400).send('Invalid data');
		return;
	}
	const result = await prisma.infoboard.create({
		data,
	});
	res.json(result);
});

// Start the server
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
