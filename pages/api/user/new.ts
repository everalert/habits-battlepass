import type { NextApiRequest, NextApiResponse } from 'next'
import bcryptjs from 'bcryptjs'
import prisma from '../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

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