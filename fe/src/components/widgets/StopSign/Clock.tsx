import { useEffect, useState } from "react";


function Clock() {
	const [time, setTime] = useState(new Date());
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 500);
		return () => {
			clearInterval(interval);
		}
	}, []);

	return (
		<span>
			{time.toLocaleTimeString()}
		</span>
	)
}
export default Clock;
