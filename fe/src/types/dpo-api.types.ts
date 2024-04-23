export enum DpoServers {
	DPO = 'dpo',
	PRODUCTION = 'production',
	PRODUCTION_SOUND = 'productionSound',
	WSS = 'wss',
}

export interface DpoMittscc {
	server: Record<string, DpoMittsccServer>;
}

export interface DpoMittsccServer {
	proxy: boolean;
	url: string;
	authorization: string;
}

export interface DpoGeoPosition {
	lat: number;
	lon: number;
	latAvg?: number;
	lonAvg?: number;
}

export interface DpoAgency {
	color: string;
	id: string;
	name: string;
	shortName: string;
	timeone: string;
	url: string;
}

export type DpoTripMode = 'bus' | 'ferry' | 'train' | 'tram';

export interface DpoTrip {
	agency: DpoAgency;
	arrivalDelay: number;
	bikesAllowed: boolean;
	departureDelay: number;
	headsign: string;
	isCityRoute: boolean;
	mode: DpoTripMode;
	platform: string;
	realtimeArrival: number;
	realtimeDeparture: number;
	scheduledArrival: number;
	scheduledDeparture: number;
	routeColor: string;
	serviceDay: number;
	shortName: string;
	stopID: string;
	tripId: string;
	tripOnOrder: boolean;
	wheelchairAccessible: boolean;
}

export interface DpoStopGroup extends DpoGeoPosition {
	active: boolean;
	buses: string[];
	cities: string[];
	count: number;
	ferries: string[];
	geoPosition: DpoGeoPosition;
	groupHeadsigns: Record<string, string[]>;
	groupId: string;
	groupItems: string[];
	id: string;
	modes: DpoTripMode[];
	name: string;
	nameF: string;
	priority: number;
	routes: string[];
	shortName: string;
	zones: string[];
	trams: string[];
	trains: string[];
	trolls: string[];
}

export interface DpoStopGroupWithTrips extends DpoStopGroup {
	trips: DpoTrip[];
}
