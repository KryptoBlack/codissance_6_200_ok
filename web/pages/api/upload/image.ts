import { NextkitError } from 'nextkit';

import { api } from '../../../utils/api';
import { busboyParseForm } from '../../../utils/form';
import { uploadAndProcessImage } from '../../../utils/image';

export const config = {
	api: {
		bodyParser: false
	}
};

export type ImageUploadResponse = {
	pathName?: string;
};

export default api({
	async POST({ ctx, req }) {
		const user = await ctx.getSelfStrippedUser();

		if (!user?.id) {
			throw new NextkitError(401, 'You must be logged in to do this.');
		}

		const { buffer, mimeType } = await busboyParseForm(req).catch((err) => {
			throw new NextkitError(500, err.message);
		});

		let fileLocation = await uploadAndProcessImage(buffer, mimeType);

		if (!fileLocation && buffer.length >= 1) {
			throw new NextkitError(500, 'Image failed to upload.');
		}

		const body: ImageUploadResponse = {
			pathName: `https://meetuppp-assets.s3.ap-south-1.amazonaws.com${fileLocation}`
		};

		return body;
	}
});
