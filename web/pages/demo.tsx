import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { SubmitDemoRequestForm } from '../components/contact/SubmitDemoRequestForm';
import Column from '../components/layout/Column';
import { Footer } from '../components/layout/Footer';
import PageWrapper from '../components/layout/PageWrapper';
import { Navigation } from '../components/navigation';
import { Heading } from '../components/primitives/Heading';

const DemoPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Request Demo — Meetuppp"
				description={`Fill out the form below to submit a demo request.`}
				openGraph={{
					url: 'http://localhost:5555/pricing',
					title: 'Request Demo — Meetuppp',
					description: `Fill out the form below to submit a demo request.`,
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
				<div className="bg-primary-700 text-white">
					<Column className="flex flex-col items-center">
						<Heading>Create a Demo Request</Heading>
						<p className="mt-4 text-base text-gray-100">
							Fill out the form below to submit a demo request.
						</p>
					</Column>
				</div>

				<Column variant="halfWidth">
					<SubmitDemoRequestForm />
				</Column>
			</PageWrapper>

			<Footer />
		</>
	);
};

export default DemoPage;
