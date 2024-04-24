import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export interface User {
	id: string;
	username: string;
	password: string;
}

export interface RequestWithUser extends Request {
	user: User | undefined;
}


const loginMiddleware = (prisma: PrismaClient) => async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['Authorization'] ?? req.headers['authorization'];

	if (!token) {
		return res.status(401).send('Missing token');
	}

	const session = await prisma.userSessions.findUnique({
		where: {
			token: token as string,
		},
		include: {
			user: true,
		},
	});

	if (!session) {
		return res.status(401).send('Invalid token');
	}

	(req as RequestWithUser).user = session.user;
	next();
}

export default loginMiddleware;
