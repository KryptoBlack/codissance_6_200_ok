import type { Prisma } from '@prisma/client';

import { apiRequestGenerator } from './utils';

const TOWNSCRIPT_BASE_URL = 'https://www.townscript.com/';

const apiRequest = apiRequestGenerator(TOWNSCRIPT_BASE_URL);

export async function fetchAllGroups(): Promise<any[]> {
	return [null];
}

export async function fetchAllEvents(_: any): Promise<any> {
	let eventsData: any[] = [];
	for (let i = 0; i < 3; i++) {
		let {
			data: { data }
		} = await apiRequest(`listings/event/online`, {
			method: 'POST',
			query: {
				page: i,
				size: 100
			},
			headers: {
				authoriation:
					'eyJhbGciOiJIUzUxMiJ9.eyJST0xFIjoiUk9MRV9DTElFTlQiLCJzdWIiOiJhcGlAdG93bnNjcmlwdC5jb20iLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE2MTY2ODI2MTA3NDQsIlVTRVJfSUQiOjAsImV4cCI6MTE2MTY2ODI2MDl9.pj_RtPKGLTgilvS8s01oVDa3CW3oCW2uk1u79ft7mqj_8_XpwtOiG__fTB0Xg44VXi1Hi9qrYfh1QsMwI0abWQ'
			},
			body: {
				organizerCountryCode: 'IN'
			}
		});

		if (data.length == 0) break;
		eventsData = eventsData.concat(data);
	}
	
    return eventsData.map((eventData) => createEvent(eventData));
}

export function createEvent(eventData: any): Prisma.EventCreateInput {
	let {
		cardImageUrl,
		city,
		country,
		displayName,
		endTime,
		onlineEvent,
		shortName,
		shortDescription,
		startTime,
		eventTimeZone,
		imageMetadata
	} = eventData;
	let color = "#" + JSON.parse(imageMetadata).card?.color ?? '#563de1';

	return {
		slug: '',
		name: `Townscript: ${displayName}`,
		location: city && country ? `${city}, ${country}` : city ?? country,
		startDate: startTime,
		endDate: endTime,
		type: onlineEvent ? 'VIRTUAL' : 'IN_PERSON',
		privacy: 'PUBLIC',
		image: 'https://www.townscript.com/assets/images/ts-logo.svg',
		banner: cardImageUrl,
		color,
		description: shortDescription,
		timeZone: eventTimeZone,
		externalUrl: `${TOWNSCRIPT_BASE_URL}/e/${shortName}`
	};
}
