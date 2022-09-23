import type { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { prisma } from '@eventalapp/shared/db/client';
import { processSlug } from '@eventalapp/shared/utils';

import { fetchAllEvents, fetchAllGroups } from './bylde';

dayjs.extend(utc);
dayjs.extend(timezone);

async function createEvents(eventsData: Prisma.EventCreateInput[]) {
	let slugs = eventsData.map(({ name }) => processSlug(name));
	let slugUniqueness = await Promise.all(
		slugs.map(async (slug) => !Boolean(await prisma.event.findFirst({ where: { slug } })))
	);

	return prisma.event.createMany({
		data: eventsData
			.filter((_, index) => slugUniqueness[index])
			.map(({ startDate, endDate, timeZone, createdAt, ...otherEventData }, index) => ({
				...otherEventData,
				slug: slugs[index],
				startDate: dayjs(startDate).tz(timeZone).startOf('day').toDate(),
				endDate: dayjs(endDate).tz(timeZone).endOf('day').toDate(),
				createdAt: dayjs(createdAt).toDate()
			}))
	});
}

async function main() {
	let groups = await fetchAllGroups();
	let events: Prisma.EventCreateInput[] = await Promise.all(
		groups.slice(0, 10).map((group: any) => fetchAllEvents(group))
	).then((e) => e.flat());

	console.log(await createEvents(events.slice(0, 10)));
}
main();
