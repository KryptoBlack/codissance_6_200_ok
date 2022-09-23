import type { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { prisma } from '@eventalapp/shared/db/client';
import { processSlug } from '@eventalapp/shared/utils';

import { fetchAllEvents, fetchAllGroups } from './townscript';

dayjs.extend(utc);
dayjs.extend(timezone);

async function createEvents(eventsData: Prisma.EventCreateInput[]) {
	let slugs = eventsData.map(({ name }) => processSlug(name));
	let createManyData = [];
	for (let i = 0; i < eventsData.length; i++)
		if (!(await prisma.event.findFirst({ where: { slug: slugs[i] } }))) {
			let { startDate, endDate, timeZone, createdAt, ...otherEventData } = eventsData[i];
			createManyData.push({
				...otherEventData,
				slug: slugs[i],
				startDate: dayjs(startDate).tz(timeZone).startOf('day').toDate(),
				endDate: dayjs(endDate).tz(timeZone).endOf('day').toDate(),
				createdAt: dayjs(createdAt).toDate()
			});
		}

	return prisma.event.createMany({
		data: createManyData
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
