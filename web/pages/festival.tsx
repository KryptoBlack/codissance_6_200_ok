import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import Column from '../components/layout/Column';
import { Footer } from '../components/layout/Footer';
import PageWrapper from '../components/layout/PageWrapper';
import { Navigation } from '../components/navigation';
import { Heading } from '../components/primitives/Heading';

const PricingPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Festival — Meetuppp"
				description={`See why Meetuppp is perfect for your next festival event.`}
				openGraph={{
					url: 'https://evental.app/pricing',
					title: 'Festival — Meetuppp',
					description: `See why Meetuppp is perfect for your next festival event.`,
					images: [
						{
							url: 'https://cdn.evental.app/images/logo.jpg',
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
					<Heading>Festival Events with Meetuppp</Heading>
					<p className="mt-4 text-base text-gray-600">
						See why Meetuppp is perfect for your next festival event.
					</p>
				</Column>
			</PageWrapper>
			<Footer />
		</>
	);
};

export default PricingPage;
