import { useEffect, useState } from "react";
import { API_URL } from "../Api";

async function findStops(search: string) {
	const url = `${API_URL}/api/stops/search?q=${encodeURIComponent(search)}`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

export function StopSearch() {

	const [search, setSearch] = useState<string>('');
	const [results, setResults] = useState<any[]>([]);

	useEffect(() => {
		if (search.length === 0) {
			setResults([]);
			return;
		}
		findStops(search).then(setResults);

	}, [search]);

	return (
		<>
			<input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Hledat zastávky" />
			<br />
			<pre>{JSON.stringify(results, null, 2)}</pre>
		</>
	);
}
