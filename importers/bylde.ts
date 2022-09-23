import type { Prisma } from '@prisma/client';

import { apiRequestGenerator } from './utils';

const BYLDE_BASE_URL = 'https://www.bylde.com';

const apiRequest = apiRequestGenerator(BYLDE_BASE_URL);

export async function fetchAllGroups(): Promise<any[]> {
	let groupsData: any[] = [];
	for (let i = 0; ; i++) {
		let { results } = await apiRequest('groups/api/v1', {
			query: {
				page: i,
				limit: 100
			}
		});

		if (results.length == 0) break;
		groupsData = groupsData.concat(results);
	}

	return groupsData;
}

export async function fetchAllEvents(groupData: any): Promise<Prisma.EventCreateInput[]> {
	let eventsData: any[] = [];
	for (let i = 0; ; i++) {
		let results = await apiRequest(`groups/api/v1/meetups/${groupData.GROUPUID}`, {
			query: {
				page: i,
				limit: 100
			}
		});

		if (results.length == 0) break;
		eventsData = eventsData.concat(results);
	}

	return eventsData.map((eventData) => createEvent(eventData, groupData));
}

export function createEvent(eventData: any, groupData?: any): Prisma.EventCreateInput {
	let {
		CITY,
		COUNTRY,
		DESCRIPTION,
		MEETUPUID,
		START_DATE,
		TITLE,
		TYPE,
		UPDATED_AT,
		ZOOM_JOIN_URL,
		ZOOM_START_URL
	} = eventData;

	return {
		slug: '',
		name: `Bylde: ${TITLE}`,
		location: CITY && COUNTRY ? `${CITY}, ${COUNTRY}` : CITY ?? COUNTRY,
		startDate: START_DATE,
		endDate: START_DATE,
		type: TYPE == 'LIVE' ? 'IN_PERSON' : 'VIRTUAL',
		privacy: 'PUBLIC',
		image: 'https://www.bylde.com/assets/img/bylde-logo-small.webp',
		banner: groupData?.IMAGE,
		color: '#28a745',
		description: [
			DESCRIPTION,
			ZOOM_JOIN_URL ? `Zoom join url: ${ZOOM_JOIN_URL}` : null,
			ZOOM_START_URL ? `Zoom start url: ${ZOOM_START_URL}` : null
		]
			.filter((e) => !!e)
			.join('\n'),
		createdAt: UPDATED_AT,
		timeZone: 'Asia/Kolkata',
		externalUrl: `${BYLDE_BASE_URL}/groups/events/id/${MEETUPUID}`
	};
}
