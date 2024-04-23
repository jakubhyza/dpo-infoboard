import { useCallback, useEffect, useState } from "react";
import { createDebouncer } from "../../lib/debouncer";
import { searchStopsByName } from "../../lib/api";
import { DpoStopGroup } from "../../types/dpo-api.types";
import StopSelectionWidget from "./StopSelectionWidget";

const debounce = createDebouncer(500);

function StopSearch({onChange = () => {}} : StopSearchProps) {

	const [search, setSearch] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [results, setResults] = useState<DpoStopGroup[]>([]);

	const searchInput = useCallback((searchElement: HTMLInputElement) => {
		if (searchElement) {
			searchElement.focus();
		}
	}, [])

	useEffect(() => {
		if (search.length < 3) {
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
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Hledat zastávky"
				ref={searchInput}
			/>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '.5rem',
				marginTop: '1rem',
				overflowY: 'auto',
				maxHeight: '20rem',
				position: 'relative',
			}}>
				{loading && search.length >= 3 && (
					<div>Načítám...</div>
				)}
				{!loading && (
					<>
						{results.map((stop) => (
							<StopSelectionWidget
								key={stop.id}
								stop={stop}
								onClick={() => onChange(stop)}
							/>
						))}
					</>
				)}

				{search.length  < 3 && (
					<div style={{
						textAlign: 'center',
						fontSize: '.8rem',
						color: '#666',
					}}>
						Začněte psát pro vyhledávání zastávky
						{search.length > 0 && (
							<div>Ještě alespoň {3 - search.length} znaky</div>
						)}
					</div>
				)}
			</div>
		</>
	);
}

interface StopSearchProps {
	onChange: (stop: DpoStopGroup) => void;
}

export default StopSearch;
