export function normalizeHeadsign(headsign: string) {
	return headsign
		.replace(/, ,/g, ',')
		.replace(/,/g, ', ')
}
