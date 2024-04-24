import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import { sha512 } from 'js-sha512';
import Cache from './cache.js';
import { dpoEmergencies, dpoSeachStops, dpoStopTimes } from './dpo/dpo-api.js';
import { DpoStopGroupWithTrips } from './dpo/dpo-api.types.js';
import loginMiddleware from './middleware/login-middleware.js';

const port = 8080;
const app = express();
const prisma = new PrismaClient();


app.use(cors({
	origin: '*',
}));
app.use(express.json());

const stopCache = new Cache<DpoStopGroupWithTrips | undefined>(1000 * 60 * 45);

app.get('/api/stops/search', loginMiddleware(prisma), async (req, res) => {
	const query = req.query.q;
	if (typeof query !== 'string') {
		res.status(400).send('Invalid query');
		return;
	}

	const data = await dpoSeachStops(query);
	res.json(data);
});

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


app.post('/api/login', async (req, res) => {
	const { username, password } = req.body;
	if (typeof username !== 'string' || typeof password !== 'string') {
		res.status(400).send('Invalid data');
		return;
	}
	const user = await prisma.user.findFirst({
		where: {
			username,
			password: sha512(password),
		},
	});
	if (!user) {
		res.status(401).send('Invalid credentials');
		return;
	}
	const session = await prisma.userSessions.create({
		data: {
			userId: user.id,
		},
	});
	res.json({
		token: session.token,
	});
});

// Logged users only
app.use(loginMiddleware(prisma));
app.post('/api/logout', async (req, res) => {
	const token = req.headers.authorization;
	if (!token) {
		res.status(400).send('Missing token');
		return;
	}
	try {
		await prisma.userSessions.delete({
			where: {
				token: token,
			},
		});
	} catch {

	}finally {
		res.json(true);
	}
});

app.get('/api/signs/:id', async (req, res) => {
	const id = req.params.id;
	if (typeof id !== 'string') {
		res.status(400).send('Invalid ID');
		return;
	}
	const data = await prisma.infoboard.findUnique({
		where: {
			id,
			userId: (req as any).user?.id,
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
			userId: (req as any).user?.id,
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
			userId: (req as any).user?.id,
		},
		data,
	});
	res.json(result);
});

app.get('/api/signs', async (req, res) => {
	const data = await prisma.infoboard.findMany({
		where: {
			userId: (req as any).user?.id,
		},
	});
	res.json(data);
});

app.post('/api/signs', async (req, res) => {
	const data = req.body;
	if (!data) {
		res.status(400).send('Invalid data');
		return;
	}
	const result = await prisma.infoboard.create({
		data: {
			...data,
			userId: (req as any).user?.id,
		},
	});
	res.json(result);
});

// Start the server
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
