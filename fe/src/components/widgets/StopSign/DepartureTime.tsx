function DepartureTime({ time }: { time: number }) {
	const now = Math.floor(new Date().getTime() / 1000);
	const diff = time - now;
	const t15minutes = 15 * 60;

	if (diff <= 60) {
		return <span className="bold">*</span>;
	}

	if (diff < t15minutes) {
		return <span><span className="bold">{Math.floor(diff / 60)}</span> min</span>;
	}

	const departure = new Date(time * 1000);
	const hours = departure.getHours();
	const minutes = departure.getMinutes();
	return <span className="bold">{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}</span>;
}

export default DepartureTime;
