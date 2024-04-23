import { DpoTrip } from '../../../types/dpo-api.types';
import DepartureTime from './DepartureTime';
import style from './StopSignWidget.module.css';

function StopTripInfo({trip}: StopTripInfoProps) {
	return (
		<div className={style.TripWidget}>
			<div className={style.TripWidget__ShortName}>
				{trip.shortName}
			</div>
			<div className={style.TripWidget__HeadSign}>
				{trip.headsign}
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
