import { useCallback, useEffect, useState } from "react";
import { Infoboard } from "../../types/config.types";
import StopInput from "../stop-input/StopInput";
import { DpoStopGroup } from "../../types/dpo-api.types";
import { loadStopData } from "../../lib/api";

const errorStyle = {
	color: 'red',
	margin: '.5rem 0',
	display: 'block',
};

function SignEditor(props: SignEditorProps) {
	const [sign, setSign] = useState<Infoboard>(props.initialData);
	const [initialStop, setInitialStop] = useState<DpoStopGroup | null>(null);

	useEffect(() => {
		if (props.initialData.stops && !initialStop) {
			loadStopData(props.initialData.stops).then(setInitialStop);
		}
	}, [props.initialData, initialStop])

	const handleSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();

		if (sign.title.length < 3) {
			alert('Název tabule musí mít alespoň 3 znaky');
			return;
		}

		if (!sign.stops) {
			alert('Vyberte zastávku');
			return;
		}
		props.onSave(sign);

	}, [sign, props]);

	if (!initialStop && props.initialData.stops) {
		return "Načítám data...";
	}

	return (
		<>
			<h1>{sign.id !== '-1' ? 'Upravit' : 'Vytvořit'} tabuli</h1>
			<label>
				Název tabule:
				<input type="text" value={sign.title} onChange={(e) => setSign({ ...sign, title: e.target.value })} required minLength={3} />
				{sign.title.length < 3 && <span style={errorStyle}>Název musí mít alespoň 3 znaky</span>}
			</label>
			<br />
			<br />

			Zastávka:
			<div>
				<StopInput value={initialStop} onChange={(stops) => setSign({ ...sign, stops: stops?.id ?? '' })} />
				<br />
				{!sign.stops && <span style={errorStyle}>Vyberte zastávku</span>}
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
			<button onClick={handleSubmit}>
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
