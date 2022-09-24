import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { SubmitSupportTicketForm } from '../components/contact/SubmitSupportTicketForm';
import Column from '../components/layout/Column';
import { Footer } from '../components/layout/Footer';
import PageWrapper from '../components/layout/PageWrapper';
import { Navigation } from '../components/navigation';
import { Heading } from '../components/primitives/Heading';

const SupportPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Support — Meetuppp"
				description={`Fill out the form below to submit a support ticket.`}
				openGraph={{
					url: 'http://localhost:5555/pricing',
					title: 'Support — Meetuppp',
					description: `Fill out the form below to submit a support ticket.`,
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
						<Heading>Create a Support Ticket</Heading>
						<p className="mt-4 max-w-2xl text-center text-base text-gray-100">
							Fill out the form below to submit a support ticket.
						</p>
					</Column>
				</div>

				<Column variant="halfWidth">
					<SubmitSupportTicketForm />
				</Column>
			</PageWrapper>

			<Footer />
		</>
	);
};

export default SupportPage;
