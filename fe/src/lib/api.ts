import { Infoboard } from "../types/config.types";

export const API_URL = 'http://localhost:8080';
let token: string | null = localStorage.getItem('token') ?? null;

export async function searchStopsByName(search: string) {
	if (!token) {
		throw new Error('No token');
	}

	const url = `${API_URL}/api/stops/search?q=${encodeURIComponent(search)}`;
	const response = await fetch(url, {
		headers: {
			'Authorization': token,
		},
	});
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
	if (!token) {
		throw new Error('No token');
	}

	const url = `${API_URL}/api/signs`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token,
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
	if (!token) {
		throw new Error('No token');
	}

	const url = `${API_URL}/api/signs/${id}`;
	const response = await fetch(url, {
		headers: {
			'Authorization': token,
		},
	});
	const data = await response.json();
	return data;
}

export async function listSigns() {
	if (!token) {
		throw new Error('No token');
	}

	const url = `${API_URL}/api/signs`;
	const response = await fetch(url, {
		headers: {
			'Authorization': token,
		},
	});
	const data = await response.json();
	return data;
}

export async function updateSign(data: Infoboard) {
	if (!token) {
		throw new Error('No token');
	}

	const url = `${API_URL}/api/signs/${data.id}`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token,
		},
		body: JSON.stringify(data),
	});
	const responseData = await response.json();
	return responseData;
}

export async function deleteSign(id: string) {
	if (!token) {
		throw new Error('No token');
	}

	const url = `${API_URL}/api/signs/${id}`;
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Authorization': token,
		},
	});
	const responseData = await response.json();
	return responseData;
}

export async function login(username: string, password: string) {
	try {
		const url = `${API_URL}/api/login`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});
		const data = await response.json();
		token = data.token;
		if (token) {
			localStorage.setItem('token', token);
		}
		return true;
	} catch (e) {
		return false;
	}
}

export async function logout() {
	if (!token) {
		throw new Error('No token');
	}

	const url = `${API_URL}/api/logout`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Authorization': token,
		},
	});
	const data = await response.json();
	token = null;
	localStorage.removeItem('token');
	return data;
}

export function isLoggedIn() {
	return !!token;
}
