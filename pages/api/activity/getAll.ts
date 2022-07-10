import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


type ActivityWithUnitAndVariations = Prisma.ActivityGetPayload<{
	include: {
		unit: true,
		variations: true
	}
}>


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

	const { userId } = req.body;

	const act: ActivityWithUnitAndVariations[] = await prisma.activity.findMany({
		where: { userId },
		include: {
			unit: true,
			variations: true
		},
	})

	res.json(act)

}