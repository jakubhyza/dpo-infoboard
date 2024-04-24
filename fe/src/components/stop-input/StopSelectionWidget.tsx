import StopIcon from "./StopIcon";
import styles from './StopSelectionWidget.module.css';

function StopSelectionWidget({stop, onClick = () => {}, style}: StopSelectionWidgetProps) {
	return (
		<div className={styles.StopWidget} onClick={onClick} style={style}>
			<div>
				<StopIcon modes={stop.modes} />
			</div>
			<div>
				<div className={styles.StopWidgetName}>{stop.name}</div>
				{typeof(stop.routes) !== 'string' && stop.routes.length > 0 && (
					<div className={styles.StopWidgetLines}>Linky {stop.routes.join(', ')}</div>
				)}
				{ typeof(stop.routes) !== 'string' && stop.routes.length === 0 && (
					<div className={styles.StopWidgetLines}>{'-'}</div>
				)}
				{typeof(stop.routes) === 'string' && (
					<div className={styles.StopWidgetLines}>{stop.routes}</div>
				)}
			</div>
		</div>
	);
}

interface StopSelectionWidgetProps {
	stop: {
		modes: string[];
		name: string;
		routes: string[] | string;
	};
	onClick: () => void;
	style?: React.CSSProperties;
}

export default StopSelectionWidget;
