import { S3 } from 'aws-sdk';
import crypto from 'crypto';
import { NextkitError } from 'nextkit';
import { uploadToBucket } from 'utils/file';
import Web3 from 'web3';

import { prisma } from '@eventalapp/shared/db/client';

import MeetupppContract from '../../../../web3/polygon/build/contracts/Meetuppp.json';
import { api } from '../../../utils/api';

export default api({
	async POST({ req, ctx }) {
		const user = await ctx.getSelfStrippedUser();
		const { eid, recipient, type = 'ticket' } = req.body;

		if (!user?.id) {
			throw new NextkitError(401, 'You must be logged in to do this.');
		}

		if (!user.emailVerified) {
			throw new NextkitError(
				401,
				'You must verify your account to do this. Request a verification email in your user settings by clicking on your profile in the top right.'
			);
		}

		const event = await prisma.event.findFirst({
			where: { OR: [{ id: String(eid) }, { slug: String(eid) }] },
			select: {
				name: true,
				endDate: true
			}
		});

		if (!event) {
			throw new NextkitError(404, 'Event not found.');
		}

		let image = await generateImage({
			eventName: event.name,
			userName: user.name,
			type,
			date: event.endDate
		});
		let metadataUrl = await uploadMetadata({
			name: `${event.name} ${type}`,
			description: `${type} for event '${event.name}', minted to ${user.name}`,
			image_url: image,
			attributes: [
				{
					trait_type: 'event',
					value: event.name
				},
				{
					trait_type: 'user',
					value: user.name
				}
			]
		});

		const web3 = new Web3(
			new Web3.providers.HttpProvider('https://matic-mumbai.chainstacklabs.com')
		);
		// @ts-ignore
		let contractAddress = MeetupppContract.networks[String(await web3.eth.net.getId())].address;
		// @ts-ignore
		const nftContract = new web3.eth.Contract(MeetupppContract.abi, contractAddress);

		const tx: any = nftContract.methods.issue(recipient, metadataUrl);
        console.log(nftContract.methods.issue.toString())
		const senderPublicKey = web3.eth.accounts.privateKeyToAccount(
			process.env.POLYGON_PRIVATE_KEY!
		).address;
		const gas = await tx.estimateGas({ from: senderPublicKey });
		const gasPrice = await web3.eth.getGasPrice();
		const data = tx.encodeABI();
		const nonce = await web3.eth.getTransactionCount(senderPublicKey);

		const signedTx = await web3.eth.accounts.signTransaction(
			{
				to: nftContract.options.address,
				data,
				gas,
				gasPrice,
				nonce
			},
			process.env.POLYGON_PRIVATE_KEY!
		);
		const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);

		return {
			tx: receipt.transactionHash
		};
	}
});

export async function generateImage({
	eventName,
	userName,
	date,
	type
}: {
	eventName: string;
	userName: string;
	date: Date;
	type: string;
}) {
	let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 600">
    <text dx="0" dy="0" font-family="Sans-Serif" font-size="30" font-weight="400" transform="translate(131.767258 180.624717)" stroke-width="0">
        Username: ${userName}
    </text>
    <text dx="0" dy="0" font-family="Sans-Serif" font-size="30" font-weight="400" transform="translate(82.002472 272.974196)" stroke-width="0">
        Event name: ${eventName}
    </text>
    <text dx="0" dy="0" font-family="Sans-Serif" font-size="30" font-weight="400" transform="translate(185.785416 327.29742)" stroke-width="0">
        Date: ${date.toISOString().substring(0, 10)}
    </text>
</svg>`;

	let imageBuffer = Buffer.from(svg);
	return `data:image/svg+xml;base64,${imageBuffer.toString('base64')}`;
}

export const uploadMetadata = async (json: any) => {
	const params: S3.Types.PutObjectRequest = {
		Bucket: 'meetuppp-assets',
		Key: `metadata/${crypto.randomBytes(20).toString('hex')}.json`,
		Body: JSON.stringify(json),
		ContentType: 'application/json'
	};

	let path = await uploadToBucket(params);
	return `https://meetuppp-assets.s3.ap-south-1.amazonaws.com${path}`;
};
