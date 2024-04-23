import { DpoStopGroup } from "../../types/dpo-api.types";
import StopIcon from "./StopIcon";
import style from './StopSelectionWidget.module.css';

function StopSelectionWidget({stop, onClick = () => {}}: StopSelectionWidgetProps) {
	return (
		<div className={style.StopWidget} onClick={onClick}>
			<div>
				<StopIcon modes={stop.modes} />
			</div>
			<div>
				<div className={style.StopWidgetName}>{stop.name}</div>
				<div className={style.StopWidgetLines}>Linky {stop.routes.join(', ')}</div>
			</div>
		</div>
	);
}

interface StopSelectionWidgetProps {
	stop: DpoStopGroup;
	onClick: () => void;
}

export default StopSelectionWidget;
