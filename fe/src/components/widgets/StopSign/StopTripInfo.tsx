import { normalizeHeadsign } from '../../../lib/normalize-headsigns';
import { DpoTrip } from '../../../types/dpo-api.types';
import DepartureTime from './DepartureTime';
import style from './StopSignWidget.module.css';

function StopTripInfo({trip}: StopTripInfoProps) {
	const blink = trip.scheduledDeparture * 1000 < Date.now() + 1000 * 60;
	return (
		<div className={`${style.TripWidget} ${blink ? 'blinking' : ''}`}>
			<div className={style.TripWidget__ShortName}>
				{trip.shortName}
			</div>
			<div className={style.TripWidget__HeadSign}>
				{normalizeHeadsign(trip.headsign)}
			</div>
			<div>
				<DepartureTime time={trip.scheduledDeparture} />
			</div>
		</div>
	)
}

interface StopTripInfoProps {
	trip: DpoTrip;
}

export default StopTripInfo;
