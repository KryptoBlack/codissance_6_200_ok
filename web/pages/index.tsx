import { EventList } from 'components/events/EventList';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';

import { useUpcomingEvents } from '@eventalapp/shared/hooks/queries/useUpcomingEvents';

import { AspectImage } from '../components/guides/AspectImage';
import Column from '../components/layout/Column';
import { Footer } from '../components/layout/Footer';
import PageWrapper from '../components/layout/PageWrapper';
import { Navigation } from '../components/navigation';
import { Heading } from '../components/primitives/Heading';
import { LinkButton } from '../components/primitives/LinkButton';
import { Paragraph } from '../components/primitives/Paragraph';

const HomePage: NextPage = () => {
	const { data: upcomingEvents, error: upcomingEventsError } = useUpcomingEvents(5);

	return (
		<>
			<NextSeo
				title="Meetuppp — Event management software from the future"
				description="Event management software that's highly intuitive. Your attendees and organizers will love using Meetuppp for your in-person, hybrid, and virtual events."
				openGraph={{
					url: 'http://localhost:5555',
					title: 'Meetuppp — Event management software from the future',
					description:
						"Event management software that's highly intuitive. Your attendees and organizers will love using Meetuppp for your in-person, hybrid, and virtual events.",
					images: [
						{
							url: 'https://meetuppp-assets.s3.ap-south-1.amazonaws.com/images/logo.jpg',
							width: 389,
							height: 389,
							alt: 'Meetuppp Logo Alt',
							type: 'image/jpeg'
						}
					]
				}}
			/>

			<Navigation />

			<PageWrapper>
				<Column className="flex flex-col items-center">
					<Heading variant="sm" level={6} className="mb-3 text-center text-primary">
						EVENT MANAGEMENT APP
					</Heading>
					<Heading variant="4xl" className="mb-3 text-center">
						Host Outstanding Events
					</Heading>
					<Paragraph className="mb-6 max-w-4xl text-center text-gray-600" variant="xl">
						Event management software that's highly intuitive. Your attendees and organizers will
						love using Meetuppp for your in-person, hybrid, and virtual events.
					</Paragraph>
					<div className="z-10 grid grid-cols-2 gap-3">
						<Link href="/events/create" passHref>
							<LinkButton variant="primary" padding="large">
								Host An Event
							</LinkButton>
						</Link>
						<Link href="/events" passHref>
							<LinkButton variant="default" padding="large">
								View All Events
							</LinkButton>
						</Link>
					</div>

					<div className="relative mt-7 w-full rounded-md bg-white md:mt-14">
						<div className="relative mx-auto max-w-full sm:w-full sm:max-w-[1200px]">
							<div className="absolute top-[30px] h-32 w-full overflow-visible sm:top-[75px]">
								<div className="bloom bloom-one left-0" />
								<div className="bloom bloom-three left-[34%]" />
								<div className="bloom bloom-two right-0" />
							</div>
						</div>

						<AspectImage
							alt="Event Overview"
							ratio={1602 / 817}
							className="border border-gray-200 bg-white shadow-sm"
							imageUrl={
								'https://meetuppp-assets.s3.ap-south-1.amazonaws.com/images/landing-graphic.png'
							}
						/>
					</div>
				</Column>

				<div className="bg-primary-600 text-white">
					<Column>
						<Heading level={3} className="mb-3 tracking-normal">
							Upcoming MeetUps
						</Heading>
						<Paragraph className="text-gray-100">
							MeetUps coming in a few days. Join them now!
						</Paragraph>
					</Column>
				</div>

				<Column>
					{upcomingEventsError ? (
						<Paragraph>Failed to load upcoming events</Paragraph>
					) : (
						<EventList events={upcomingEvents} className="mt-5" />
					)}
				</Column>

				{/* <div className="bg-primary-600 text-white">
					<Column>
						<Heading variant="sm" level={6} className="mb-3 text-gray-300">
							GETTING STARTED
						</Heading>
						<Heading level={3} className="mb-3 tracking-normal">
							Creating events couldn't be easier
						</Heading>
						<Paragraph className="text-gray-100">
							In 3 quick steps, you can get your event up and running.
						</Paragraph>

						<div className="mt-6 grid grid-cols-1 gap-7 border-t-2 border-primary-500 pt-6 lg:grid-cols-2 xl:grid-cols-3">
							<div>
								<Heading level={5} variant="sm" className="text-gray-300">
									1.
								</Heading>
								<Heading level={4} className="my-2" variant="xl">
									Create an event
								</Heading>
								<Paragraph className="text-gray-200">
									Start by{' '}
									<Link href="/events/create">
										<a className="underline">creating an event</a>
									</Link>
									, implement your branding and configure your event.
								</Paragraph>
							</div>
							<div>
								<Heading level={5} variant="sm" className="text-gray-300">
									2.
								</Heading>
								<Heading level={4} className="my-2" variant="xl">
									Create a session
								</Heading>
								<Paragraph className="text-gray-200">
									Then create a venue, a session category, and attach speakers/role members.
								</Paragraph>
							</div>
							<div>
								<Heading level={5} variant="sm" className="text-gray-300">
									3.
								</Heading>
								<Heading level={4} className="my-2" variant="xl">
									Invite your attendees
								</Heading>
								<Paragraph className="text-gray-200">
									Then invite/create organizers, attendees, and speakers/role members to your event.
								</Paragraph>
							</div>
						</div>
					</Column>
				</div> */}

				{/* <Column>
					<div className="flex flex-col items-center">
						<Heading variant="sm" level={6} className="mb-3 text-primary">
							INTERACTIVE FEATURES
						</Heading>
						<Heading level={2} variant="3xl" className="mb-3 text-center">
							Get the most out of your event
						</Heading>
						<Paragraph variant="lg" className="mb-5 max-w-3xl text-center text-gray-600 md:mb-10">
							Meetuppp is the only platform you'll ever need to setup, manage, attend, and review
							events. We've built a platform that's simple, easy to use, and powerful.
						</Paragraph>
						<CardGrid>
							<div className="relative">
								<div className="relative mx-auto max-w-full sm:w-full sm:max-w-[1200px]">
									<div className="absolute top-[30px] h-32 w-full overflow-visible sm:top-[20px]">
										<div className="bloom small bloom-one left-[10%]" />
										<div className="bloom small bloom-two right-[10%]" />
									</div>
								</div>
								<Card
									header="Attendee Roles"
									className="relative"
									body={
										<>
											Create highly customizable roles for your attendees to categorize them into
											groups. You are not restrained by "Speaker" or "Exhibitor" roles for your
											event. See{' '}
											<Link href="/guides/role/creating-a-role">
												<a className="underline">creating a role</a>
											</Link>
										</>
									}
								/>
							</div>
							<div className="relative">
								<div className="relative mx-auto max-w-full sm:w-full sm:max-w-[1200px]">
									<div className="absolute top-[30px] h-32 w-full overflow-visible sm:top-[20px]">
										<div className="bloom small bloom-one left-[10%]" />
										<div className="bloom small bloom-two right-[10%]" />
									</div>
								</div>
								<Card
									header="Attendee Experience"
									className="relative"
									body={
										<>
											Attendees have access to a user settings dashboard, where they can build out a
											customizable profile to include their location, job title, website, and a
											custom biography.
										</>
									}
								/>
							</div>
							<div className="relative">
								<div className="relative mx-auto max-w-full sm:w-full sm:max-w-[1200px]">
									<div className="absolute top-[30px] h-32 w-full overflow-visible sm:top-[20px]">
										<div className="bloom small bloom-one left-[10%]" />
										<div className="bloom small bloom-two right-[10%]" />
									</div>
								</div>
								<Card
									header="Guides & Documentation"
									className="relative"
									body={
										<>
											If you are in need of assistance, first see{' '}
											<Link href="/guides">
												<a className="underline">our guides</a>
											</Link>
											. After reading the guides, If you are still in need of help you may{' '}
											<Link href="/contact">
												<a className="underline">contact us</a>
											</Link>
											. We are more than happy to help you setup your event or answer any questions
											you may have.
										</>
									}
								/>
							</div>
							<div className="relative">
								<div className="relative mx-auto max-w-full sm:w-full sm:max-w-[1200px]">
									<div className="absolute top-[30px] h-32 w-full overflow-visible sm:top-[20px]">
										<div className="bloom small bloom-one left-[10%]" />
										<div className="bloom small bloom-two right-[10%]" />
									</div>
								</div>
								<Card
									header="Event Branding"
									className="relative"
									body={
										<>
											Use the Meetuppp Organizer dashboard to customize your events branding to fit
											your organizations needs. You can customize your event color/branding, logo,
											and set links to your website, social media.
										</>
									}
								/>
							</div>
						</CardGrid>
					</div>
				</Column> */}
			</PageWrapper>
			<Footer />
		</>
	);
};

export default HomePage;
