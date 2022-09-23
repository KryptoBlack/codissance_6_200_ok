import fetch from 'node-fetch';
import type { Response } from 'node-fetch';

export type apiRequestRawOptions = {
	method?: string;
	query?: any;
	headers?: any;
	body?: string | any;
};
async function apiRequestRaw(
	baseUrl: string,
	path: string,
	options: apiRequestRawOptions = {}
): Promise<Response> {
	let url = new URL(path, baseUrl);

	if (options.query)
		for (let [key, value] of new URLSearchParams(options.query).entries())
			url.searchParams.set(key, value);

	let headers = options.headers ?? {};
	let body = options.body;
	if (typeof body != 'string') {
		headers['content-type'] = 'application/json';
		body = JSON.stringify(body);
	}

	return fetch(url.toString(), {
		...options,
		headers,
		body
	});
}

export async function apiRequest(
	baseUrl: string,
	path: string,
	options?: apiRequestRawOptions
): Promise<any> {
	return apiRequestRaw(baseUrl, path, options).then((e) => e.json());
}

export function apiRequestGenerator(
	baseUrl: string
): (path: string, options?: apiRequestRawOptions) => Promise<any> {
	return (path, options) => apiRequest(baseUrl, path, options);
}
