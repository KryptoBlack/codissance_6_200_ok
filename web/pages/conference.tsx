import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import Column from '../components/layout/Column';
import { Footer } from '../components/layout/Footer';
import PageWrapper from '../components/layout/PageWrapper';
import { Navigation } from '../components/navigation';
import { Heading } from '../components/primitives/Heading';

const Seo = (
	<NextSeo
		title="Conference — Meetuppp"
		description={`See why Meetuppp is perfect for your next conference event.`}
		openGraph={{
			url: 'http://localhost:5555/pricing',
			title: 'Conference — Meetuppp',
			description: `See why Meetuppp is perfect for your next conference event.`,
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
);

const PricingPage: NextPage = () => {
	return (
		<>
			{Seo}

			<Navigation />

			<PageWrapper>
				<Column className="flex flex-col items-center">
					<Heading>Conference Events with Meetuppp</Heading>
					<p className="mt-4 text-base text-gray-600">
						See why Meetuppp is perfect for your next conference event.
					</p>
				</Column>
			</PageWrapper>

			<Footer />
		</>
	);
};

export default PricingPage;
