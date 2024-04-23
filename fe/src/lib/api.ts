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
