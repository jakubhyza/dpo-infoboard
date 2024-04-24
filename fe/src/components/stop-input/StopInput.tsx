import { useState } from "react";
import { DpoStopGroup } from "../../types/dpo-api.types";
import Modal from "../modal/Modal";
import StopSearch from "./StopSearch";
import StopSelectionWidget from "./StopSelectionWidget";
import Button from "../../atomic/Button";



function StopInput({value = null, onChange = () => {}}: StopInputProps) {

	const [stop, setStop] = useState<DpoStopGroup | null>(value);
	const [showSearch, setShowSearch] = useState<boolean>(false);

	return (
		<>
			{!stop && (
				<StopSelectionWidget stop={{
					name: 'Není vybrána žádná zastávka',
					modes: [],
					routes: 'Klikněte pro výběr zastávky',
				}} onClick={() => {
					setShowSearch(true);
				}} />
			)}
			{stop && (
				<div
					style={{
						display: 'flex',
					}}
				>
					<StopSelectionWidget style={{borderRadius: '5px 0 0 5px', flex: '1 1 auto'}} stop={stop} onClick={() => setShowSearch(true)} />
					<Button type="danger" style={{borderRadius: '0 5px 5px 0'}} onClick={() => {
						setStop(null);
						onChange(null);
					}}>Odebrat</Button>
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
							type="button"
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
