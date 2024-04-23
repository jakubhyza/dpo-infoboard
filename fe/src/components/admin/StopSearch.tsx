import { useEffect, useState } from "react";
import { createDebouncer } from "../../lib/debouncer";
import { searchStopsByName } from "../../lib/api";
import { DpoStopGroup } from "../../types/dpo-api.types";

const debounce = createDebouncer(500);

export function StopSearch() {

	const [search, setSearch] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [results, setResults] = useState<DpoStopGroup[



	]>([]);

	useEffect(() => {
		if (search.length === 0) {
			debounce(() => {
				setResults([]);
			});
			return;
		}
		if (!loading) {
			setLoading(true);
		}
		debounce(() => {
			searchStopsByName(search)
			.then(setResults)
			.finally(() => setLoading(false));
		});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ search ]);

	return (
		<>
			<input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Hledat zastávky" />
			<br />
			{search}
			<br />
			{loading ? 'Načítám...' : 'Načteno'}
			<br />
			<pre>{JSON.stringify(results, null, 2)}</pre>
		</>
	);
}
