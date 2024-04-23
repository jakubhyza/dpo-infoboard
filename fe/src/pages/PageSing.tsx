import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Infoboard } from "../types/config.types";
import { loadSign } from "../lib/api";
import StopSignWidget from "../components/widgets/StopSign/StopSignWidget";

function PageSign() {
	const { id } = useParams();
	const [infoboard, setInfoboard] = useState<Infoboard | null>(null);

	useEffect(() => {
		if (!id) {
			return;
		}
		loadSign(id).then(setInfoboard);
	}, [id, infoboard])

	if (!id) {
		return 'No stop ID provided';
	}

	if (!infoboard) {
		return 'Loading...';
	}

	const styleVariables = {
		'--fg-color': infoboard.primaryColor,
		'--bg-color': infoboard.backgroundColor,
	} as React.CSSProperties;

	return (
		<div style={styleVariables}>
			<StopSignWidget stopId={infoboard.stops} />
		</div>
	);

}
export default PageSign;
