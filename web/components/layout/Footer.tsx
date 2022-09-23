import React from 'react';

export const Footer: React.FC = () => {
	return (
		<footer className="shadow-sm-bottom border-t border-gray-200 bg-primary-600">
			<div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
				<p className="text-center text-base text-white">
					&copy; {new Date().getFullYear()} Meetuppp, Inc. All rights reserved.
				</p>
			</div>
		</footer>
	);
};
