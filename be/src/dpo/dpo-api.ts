import { DpoMittscc, DpoServers, DpoStopGroup, DpoStopGroupWithTrips } from "./dpo-api.types.js";
import Cache  from "../cache.js";

const DPO_CONFIG_URL = "https://scc.dpo.cz/dashboard/app/config.js";
const DPO_CACHE_MAX_AGE = 1000 * 60 * 10;

let dpoConfig: DpoMittscc | undefined = undefined;
const apiCache = new Cache<any>(DPO_CACHE_MAX_AGE);

export async function loadDpoConfig(url: string): Promise<DpoMittscc | undefined> {
	if (dpoConfig) {
		console.log("DPO config already loaded");
		return dpoConfig;
	}
	console.log(`Loading DPO config from ${url}`);

	try {
		const response = await fetch(url);
		const configScript = await response.text();
		let mittscc;

		(function () {
			const window = {};
			const location = {};
			window;
			location;
			eval(configScript);
		}).call({});

		dpoConfig = mittscc;
		console.log("DPO config loaded");
		apiCache.clear();
		return dpoConfig;
	} catch (error) {
		console.error("Failed to load DPO config:");
		console.error(error);
	}
}

async function dpoGet<T>(server: DpoServers, path: string, params: Record<string, string>): Promise<T | undefined>{
	const config = await loadDpoConfig(DPO_CONFIG_URL);
	if (!config) {
		return;
	}
	const hasParams = Object.keys(params).length > 0;
	const urlPropertyStrings = Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
	const urlProperties = urlPropertyStrings.join("&");

	const url = `${config.server[server].url}${path}${hasParams ? `?${urlProperties}` : ''}`;

	const cacheKey = url;
	const cachedData = apiCache.get(cacheKey);
	if (cachedData) {
		console.log(`Returning cached data for ${cacheKey}`);
		return cachedData;
	}

	try {
		console.log(`Fetching ${url}`);
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: config.server[server].authorization,
			},
		});
		const responseData = await response.json();
		if (responseData.status !== 'OK' && responseData.status !== 'ok') {
			return;
		}
		apiCache.set(cacheKey, responseData.data);
		return responseData.data;
	} catch (error) {
		console.error(`Failed to fetch ${url}:`);
		console.error(error);
	}
}

export async function dpoSeachStops(query: string): Promise<DpoStopGroup[]> {
	const data = await dpoGet<any>(DpoServers.DPO, '/api/navi/place', {
		group: '1',
		name: query,
		stopsOnly: 'false',
	});
	if (!data) {
		return [];
	}
	if (!data.stops) {
		return [];
	}
	return data.stops.sort((a: DpoStopGroup, b: DpoStopGroup) => b.priority - a.priority);
}

export async function dpoStopTimes(stopGroupID: string, startTime: Date | undefined = undefined, timeRange: number | undefined = undefined, numberOfDepartures: number | undefined = undefined): Promise<undefined | DpoStopGroupWithTrips> {
	const data = await dpoGet<any>(DpoServers.DPO, '/api/navi/group/stoptimes', {
		timeRange: timeRange?.toString() ?? '43200',
		numberOfDepartures: numberOfDepartures?.toString() ?? '30',
		groupID: stopGroupID,
		startTime: Math.floor((startTime?.getTime() ?? Date.now()) / 1000).toString(),
	});
	if (!data) {
		return undefined;
	}
	return data.stop;
}

export async function dpoEmergencies(): Promise<string[]> {
	const data = await dpoGet<any>(DpoServers.DPO, '/api/cms/content/published', {
		distribution: 'dashboard',
		locale: 'cs',
		category: 'emergencies',
	});

	if (!data) {
		return [];
	}
	if (!data.items) {
		return [];
	}

	return data.items.map((item: any) => {
		return `${item.item.title}: ${item.item.description}`
	});
}
