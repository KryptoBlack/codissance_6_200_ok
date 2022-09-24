import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import Color from 'color';
import Link from 'next/link';
import React from 'react';

type Props = {
	link?: string;
	color?: string;
};

export const LogoLinkItem: React.FC<Props> = (props) => {
	const { link = '/', color } = props;

	return (
		<Link href={link} passHref>
			<NavigationMenuPrimitive.Link className="h-full">
				<NavigationMenuPrimitive.Item className="h-full">
					<span className="flex h-full flex-row items-center">
						<img
							className="w-10 h-10 m-2"
							src="https://meetuppp-assets.s3.ap-south-1.amazonaws.com/images/logo.png"
							alt="logo"
						/>
						<strong
							className="font-display text-2xl font-bold tracking-tight"
							aria-label="meetuppp homepage"
						>
							Meetuppp
						</strong>
					</span>
				</NavigationMenuPrimitive.Item>
			</NavigationMenuPrimitive.Link>
		</Link>
	);
};
