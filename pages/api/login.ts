import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import prisma from '../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST':
			handlePOST(req, res);
			return;
		default:
			throw new Error(`HTTP ${req.method} method is not supported at this route.`)
	}
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
	const { id, username, password, email } = req.body;
	const where: Object | null = id ? { id } : username ? { username } : email ? { email } : { id:'' };
	const getUser: User | null  = await prisma.user.findUnique({ where });
	if (getUser !== null && bcryptjs.compareSync(password as string, getUser.password))
		res.json(getUser);
	else
		res.json({ id:null });
}