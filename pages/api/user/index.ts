import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import prisma from '../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST':
			handlePOST(req, res);
			return;
		case 'GET':
			handleGET(req, res);
			return;
		default:
			throw new Error(`HTTP ${req.method} method is not supported at this route.`)
	}
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
	const { username, password, email } = req.body;
	const hash = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
	const create = await prisma.user.create({
		data: {
			username: username,
			password: hash,
			email: email,
		},
	})
	res.json(create);
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
	const { id, username, email } = req.query;
	const where: Object | null = id ? { id } : username ? { username } : email ? { email } : { id:'' };
	const getUser: User | null  = await prisma.user.findUnique({ where });
	res.json(getUser);
}