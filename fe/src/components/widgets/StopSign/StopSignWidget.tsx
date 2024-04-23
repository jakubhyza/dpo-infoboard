import { useEffect, useState } from 'react';
import style from './StopSignWidget.module.css';
import { DpoStopGroupWithTrips, DpoTrip } from '../../../types/dpo-api.types';
import { loadStopData } from '../../../lib/api';
import StopTripInfo from './StopTripInfo';
import StopSignHeading from './StopSignHeading';


function filterOld (trip: DpoTrip) {
	return trip.scheduledDeparture * 1000 > Date.now();
}
function sortTrips (a: DpoTrip, b: DpoTrip) {
	return a.scheduledDeparture - b.scheduledDeparture;
}

function StopSignWidget({ stopId }: StopSignWidgetProps) {

	const [stopData, setStopData] = useState<DpoStopGroupWithTrips | null>(null);
	const [refresh, setRefresh] = useState<boolean>(false);

	// Fetch new data every 5 minutes
	useEffect(() => {
		loadStopData(stopId).then(setStopData);

		const interval = setInterval(() => {
			loadStopData(stopId).then(setStopData);
		}, 1000 * 60 * 5);

		return () => {
			clearInterval(interval);
		}
	}, [stopId])

	// Refresh view every 20 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setRefresh(!refresh);
		}, 1000 * 10);

		return () => {
			clearInterval(interval);
		}
	})

	return (
		<div className={style.StopSignWidget}>
			{!stopData && (
				<div className={style.Message}>
					Načítám data
				</div>
			)}
			{stopData && (
				<StopSignHeading title={stopData.name} />
			)}
			{stopData && stopData.trips.filter(filterOld).sort(sortTrips).map((trip) => (
				<StopTripInfo key={`${trip.tripId}-${trip.scheduledDeparture}`} trip={trip} />
			))}
			<div className={style.StopSignWidgetGradient}></div>
		</div>
	)
}

interface StopSignWidgetProps {
	stopId: string;
}

export default StopSignWidget;
