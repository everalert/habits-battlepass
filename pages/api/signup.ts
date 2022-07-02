import bcryptjs from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';


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