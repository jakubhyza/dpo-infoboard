import { useState } from "react";
import { DpoStopGroup } from "../../types/dpo-api.types";
import Modal from "../modal/Modal";
import StopSearch from "./StopSearch";
import StopSelectionWidget from "./StopSelectionWidget";



function StopInput({value = null, onChange = () => {}}: StopInputProps) {

	const [stop, setStop] = useState<DpoStopGroup | null>(value);
	const [showSearch, setShowSearch] = useState<boolean>(false);

	return (
		<>
			{!stop && (
				<button onClick={() => setShowSearch(true)}>Klikni pro výběr zastávky</button>
			)}
			{stop && (
				<div
					style={{
						display: 'flex',
					}}
				>
					<StopSelectionWidget stop={stop} onClick={() => setShowSearch(true)} />
					<button onClick={() => {
						setStop(null);
						onChange(null);
					}}>Odebrat</button>
				</div>
			)}
			{showSearch && (
				<Modal>
					<div style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: '1rem',
					}}>
						<h1 style={{
							margin: 0,
							fontSize: '1.5rem',
						}}>Výběr zastávky</h1>
						<button
							onClick={() => setShowSearch(false)}
						>
							X
						</button>
					</div>
					<StopSearch onChange={(stop) => {
						setShowSearch(false);
						setStop(stop);
						onChange(stop);
					}} />
				</Modal>
			)}
		</>
	)
}
interface StopInputProps {
	value: DpoStopGroup | null;
	onChange: (stop: DpoStopGroup | null) => void;
}

export default StopInput;
