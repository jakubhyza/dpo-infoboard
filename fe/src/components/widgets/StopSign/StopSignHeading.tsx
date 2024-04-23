import { normalizeHeadsign } from '../../../lib/normalize-headsigns';
import Clock from './Clock';
import style from './StopSignWidget.module.css';

function StopSignHeading(props: StopSignHeadingProps) {
	return (
		<div className={style.StopSignHeading}>
			<div>
				{normalizeHeadsign(props.title)}
			</div>
			<div>
				<Clock />
			</div>
		</div>
	)
}

interface StopSignHeadingProps {
	title: string;
}

export default StopSignHeading;
