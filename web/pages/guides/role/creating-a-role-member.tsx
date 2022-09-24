import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { GuideSection } from '../../../components/guides/GuideSection';
import { GuideSectionHeader } from '../../../components/guides/GuideSectionHeader';
import { StillNeedHelp } from '../../../components/guides/StillNeedHelp';
import { TableOfContents } from '../../../components/guides/TableOfContents';
import Column from '../../../components/layout/Column';
import { Footer } from '../../../components/layout/Footer';
import PageWrapper from '../../../components/layout/PageWrapper';
import { Navigation } from '../../../components/navigation';
import { Heading } from '../../../components/primitives/Heading';

type Section = {
	anchor: string;
	title: string;
};

const sections: Section[] = [
	{ anchor: 'navigate-to-the-dashboard', title: 'Navigate to the dashboard' },
	{ anchor: 'navigate-to-the-roles-page', title: 'Navigate to the roles page' },
	{ anchor: 'select-a-role', title: 'Select a role' },
	{ anchor: 'create-a-member', title: 'Create a role member' }
];

const CreatingRoleMemberGuidePage: NextPage = () => {
	return (
		<>
			<Navigation />

			<PageWrapper>
				<NextSeo
					title="Creating a role member — Meetuppp"
					description={`Learn how to create a role member to your event on Meetuppp.`}
					openGraph={{
						url: 'http://localhost:5555/guides/role/creating-a-role-member',
						title: 'Creating a role member — Meetuppp',
						description: `Learn how to create a role member to your event on Meetuppp.`,
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

				<div className="bg-primary-700 text-white">
					<Column className="flex flex-col items-center">
						<Heading>Creating a role member</Heading>
						<p className="mt-4 text-base text-gray-100">
							Learn how to create a role member to your event on Meetuppp.
						</p>
					</Column>
				</div>

				<Column>
					<TableOfContents
						items={[
							{
								text: sections[0].title,
								relativeLink: `/guides/role/creating-a-role-member#${sections[0].anchor}`
							},
							{
								text: sections[1].title,
								relativeLink: `/guides/role/creating-a-role-member#${sections[1].anchor}`
							},
							{
								text: sections[2].title,
								relativeLink: `/guides/role/creating-a-role-member#${sections[2].anchor}`
							},
							{
								text: sections[3].title,
								relativeLink: `/guides/role/creating-a-role-member#${sections[3].anchor}`
							}
						]}
					/>

					<GuideSection id={sections[0].anchor}>
						<GuideSectionHeader
							text={sections[0].title}
							url={`/guides/role/creating-a-role-member#${sections[0].anchor}`}
						/>

						<p className="mb-4 text-gray-700">
							To create a role member, navigate to the events admin dashboard by clicking the{' '}
							<span className="font-medium">"manage this event"</span> button.
						</p>
					</GuideSection>

					<GuideSection id={sections[1].anchor}>
						<GuideSectionHeader
							text={sections[1].title}
							url={`/guides/role/creating-a-role-member#${sections[1].anchor}`}
						/>

						<p className="mb-4 text-gray-700">
							After visiting the events dashboard, click the{' '}
							<span className="font-medium">"Roles"</span> link in the top navigation.
						</p>
					</GuideSection>

					<GuideSection id={sections[2].anchor}>
						<GuideSectionHeader
							text={sections[2].title}
							url={`/guides/role/creating-a-role-member#${sections[2].anchor}`}
						/>

						<p className="mb-4 text-gray-700">
							After visiting the roles dashboard page, select the role you wish to create members
							to.
						</p>
					</GuideSection>
					<GuideSection id={sections[3].anchor}>
						<GuideSectionHeader
							text={sections[3].title}
							url={`/guides/role/creating-a-role-member#${sections[3].anchor}`}
						/>

						<p className="mb-4 text-gray-700">
							Select the <span className="font-medium">"Create"</span> button, then enter the users
							basic information, picture, and email then hit "Create". After creating a role member,
							this user will receive an email with instructions on how to claim their Meetuppp
							account.
						</p>
					</GuideSection>

					<GuideSection>
						<StillNeedHelp />
					</GuideSection>
				</Column>

				<Footer />
			</PageWrapper>
		</>
	);
};

export default CreatingRoleMemberGuidePage;
