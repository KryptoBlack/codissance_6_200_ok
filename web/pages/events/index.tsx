import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';

import { useUpcomingEvents, useUser } from '@eventalapp/shared/hooks';

import { NotFoundPage } from '../../components/error/NotFoundPage';
import { EventList } from '../../components/events/EventList';
import { EventsPageNavigation } from '../../components/events/EventsPageNavigation';
import Column from '../../components/layout/Column';
import { Footer } from '../../components/layout/Footer';
import PageWrapper from '../../components/layout/PageWrapper';
import { Navigation } from '../../components/navigation';
import { Heading } from '../../components/primitives/Heading';

const EventsPage: NextPage = () => {
	const { data: upcomingEvents, error: upcomingEventsError } = useUpcomingEvents();
	const { data: user } = useUser();

	if (upcomingEventsError) {
		return <NotFoundPage message="No Upcoming Events" />;
	}

	const Seo = (
		<NextSeo
			title="Upcoming Events — Meetuppp"
			description="View all of the public upcoming events on evental.app."
			canonical="http://localhost:5555/events"
			openGraph={{
				url: 'http://localhost:5555/events',
				title: 'Upcoming Events',
				description: 'View all of the public upcoming events on evental.app.',
				images: [
					{
						url: 'https://meetuppp-assets.s3.ap-south-1.amazonaws.com/images/logo.jpg',
						width: 800,
						height: 600,
						alt: 'Meetuppp Logo Alt',
						type: 'image/jpeg'
					}
				],
				site_name: 'Meetuppp'
			}}
		/>
	);

	if (upcomingEvents && upcomingEvents.length === 0) {
		return (
			<>
				{Seo}

				<Navigation />

				<PageWrapper>
					<Column>
						<Heading className="mb-4 text-center">Upcoming Events</Heading>

						{user && <EventsPageNavigation />}

						<span className="mt-5 block text-center text-base">
							No events found.{' '}
							<Link href="/events/create" passHref>
								<a className="mt-3 font-medium text-primary">Create an Event</a>
							</Link>
						</span>
					</Column>
				</PageWrapper>

				<Footer />
			</>
		);
	}

	return (
		<>
			{Seo}

			<Navigation />

			<PageWrapper>
				<Column>
					<Heading className="mb-4 text-center">Upcoming Events</Heading>

					{user && <EventsPageNavigation />}

					<EventList events={upcomingEvents} hidePastEvents />
				</Column>
			</PageWrapper>

			<Footer />
		</>
	);
};

export default EventsPage;
