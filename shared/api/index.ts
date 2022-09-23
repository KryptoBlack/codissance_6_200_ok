import axios from 'axios';

export let baseURL: string;

if (process.env.API_HOST) {
	baseURL = process.env.API_HOST;
} else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
	baseURL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
} else {
	baseURL = 'http://localhost:5555';
}


export const api = axios.create({
	baseURL: `${baseURL}/api`
});
