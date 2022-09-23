import type { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

import { prisma } from '@eventalapp/shared/db';
import { generateSlug } from '@eventalapp/shared/utils';

import { fetchAllEvents, fetchAllGroups } from './bylde';

async function createEvent(eventData: Prisma.EventCreateInput) {
	const slug = await generateSlug(eventData.name, async (val) => {
		return !Boolean(
			await prisma.event.findFirst({
				where: {
					slug: val
				}
			})
		);
	});

	const event = await prisma.event.create({
		data: {
			...eventData,
			slug,
			startDate: dayjs(eventData.startDate).tz(eventData.timeZone).startOf('day').toDate(),
			endDate: dayjs(eventData.endDate).tz(eventData.timeZone).endOf('day').toDate()
		}
	});

	if (!event) {
		throw new Error('Could not create event.');
	}

	// no roles, and no one has edit permissions

	return event;
}

async function main() {
	let groups = await fetchAllGroups();
	let events = await Promise.all(
		groups.slice(0, 10).map((group: any) => fetchAllEvents(group))
	).then((e) => e.flat());
	console.log(events);
}
main();
