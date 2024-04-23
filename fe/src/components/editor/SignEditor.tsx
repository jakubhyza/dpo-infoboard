import { useEffect, useState } from "react";
import { Infoboard } from "../../types/config.types";
import StopInput from "../stop-input/StopInput";
import { DpoStopGroup } from "../../types/dpo-api.types";
import { loadStopData } from "../../lib/api";

function SignEditor(props: SignEditorProps) {
	const [sign, setSign] = useState<Infoboard>(props.initialData);
	const [initialStop, setInitialStop] = useState<DpoStopGroup | null>(null);

	useEffect(() => {
		if (props.initialData.stops && !initialStop) {
			loadStopData(props.initialData.stops).then(setInitialStop);
		}
	}, [initialStop, props.initialData.stops])

	if (!initialStop && props.initialData.stops) {
		return "Načítám data...";
	}

	return (
		<>
			<h1>Upravit tabuli</h1>
			<label>
				Název tabule:
				<input type="text" value={sign.title} onChange={(e) => setSign({ ...sign, title: e.target.value })} />
			</label>
			<br />
			<br />

			Zastávka:
			<div>
				<StopInput value={initialStop} onChange={(stops) => setSign({ ...sign, stops: stops?.id ?? '' })} />
			</div>

			<br />
			<br />

			<label>
				Primární barva:
				<input type="color" value={sign.primaryColor} onChange={(e) => setSign({ ...sign, primaryColor: e.target.value })} />
			</label>
			<br />
			<br />
			<label>
				Pozadí:
				<input type="color" value={sign.backgroundColor} onChange={(e) => setSign({ ...sign, backgroundColor: e.target.value })} />
			</label>
			<br />
			<br />
			<button onClick={() => props.onSave(sign)}>
				Uložit tabuli
			</button>
		</>
	);
}

interface SignEditorProps {
	initialData: Infoboard;
	onSave: (sign: Infoboard) => void;
}

export default SignEditor;
