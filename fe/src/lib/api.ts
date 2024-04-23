import { Infoboard } from "../types/config.types";

export const API_URL = 'http://localhost:8080';


export async function searchStopsByName(search: string) {
	const url = `${API_URL}/api/stops/search?q=${encodeURIComponent(search)}`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

export async function loadStopData(stopId: string) {
	const url = `${API_URL}/api/stops/${stopId}`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

export async function createSign(data: Infoboard) {
	const url = `${API_URL}/api/signs`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...data,
			id: undefined,
		}),
	});
	const responseData = await response.json();
	return responseData;
}

export async function loadSign(id: string) {
	const url = `${API_URL}/api/signs/${id}`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

export async function listSigns() {
	const url = `${API_URL}/api/signs`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

export async function updateSign(data: Infoboard) {
	const url = `${API_URL}/api/signs/${data.id}`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	const responseData = await response.json();
	return responseData;
}

export async function deleteSign(id: string) {
	const url = `${API_URL}/api/signs/${id}`;
	const response = await fetch(url, {
		method: 'DELETE',
	});
	const responseData = await response.json();
	return responseData;
}
