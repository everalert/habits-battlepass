import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import prisma from '../../../lib/prisma'


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
	const { id, password } = req.body;
	const getUser: User | null  = await prisma.user.findUnique({ where: { id } });
	if (getUser !== null && bcryptjs.compareSync(password as string, getUser.password)) {
		const del = await prisma.$transaction([
			prisma.season.deleteMany({ where: { userId: id }  }),
			prisma.category.deleteMany({ where: { userId: id }  }),
			prisma.activity.deleteMany({ where: { userId: id }  }),
			prisma.log.deleteMany({ where: { userId: id }  }),
			prisma.activityUnit.deleteMany({ where: { activity: { none: {} } } })
		])
		res.json(del);
	}
	else
		res.json({ id:null });
}