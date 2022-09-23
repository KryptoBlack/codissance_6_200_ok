import * as Prisma from '@prisma/client';

import { prisma } from '@eventalapp/shared/db/client';

import { api } from '../../../utils/api';

export default api({
	async GET({ ctx, req }) {
		return await getUpcomingEvents(parseInt(req.query.limit as string));
	}
});

export const getUpcomingEvents = async (limit?: number): Promise<Prisma.Event[]> => {
	return await prisma.event.findMany({
		take: limit,
		where: {
			privacy: 'PUBLIC',
			startDate: {
				gte: new Date()
			}
		},
		orderBy: [
			{
				startDate: 'asc'
			}
		]
	});
};
