import { PrismaClient } from "@prisma/client";
import { sha512 } from "js-sha512";

const prisma = new PrismaClient();

const userCount = await prisma.user.count();
if (userCount === 0) {
	console.log('Generating seed data');
	const user = await prisma.user.create({
		data: {
			username: 'admin',
			password: sha512('admin'),
		},
	});

	await prisma.infoboard.create({
		data: {
			id: 'clve45luf0001a2hxbdaoj58w',
			userId: user.id,
			title: 'Zastávka VŠB',
			stops: 'Z49542',
			layout: 'simple',
			primaryColor: '#00a5a8',
			backgroundColor: '#e6e6e6',
		},
	});

	console.log('Seed data generated');

} else {
	console.log('Skipping seed data generation as there are already users in the database');
}
