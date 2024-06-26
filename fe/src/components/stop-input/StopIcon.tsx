function getModeColor(mode: string) {
	const colors: Record<string, string> = {
		'BUS': 'blue',
		'TRAIN': '#ffae00',
		'TRAM': 'red',
		'TROLL': 'green',
		'NONE': 'black',
	};
	return colors[mode] ?? 'black';
}
function getMostImportantMode(modes: string[]) {
	if (modes.length === 0) {
		return 'NONE';
	}
	if (modes.includes('TRAIN')) {
		return 'TRAIN';
	}
	if (modes.includes('TRAM')) {
		return 'TRAM';
	}
	if (modes.includes('TROLL')) {
		return 'TROLL';
	}
	if (modes.includes('BUS')) {
		return 'BUS';
	}
	return 'BUS';
}

function StopIcon(props: StopIconProps) {
	const mode = getMostImportantMode(props.modes);
	return (
		<div style={{
			display: 'inline-block',
			width: '1rem',
			height: '1rem',
			borderRadius: '25%',
			backgroundColor: getModeColor(mode),
		}}>

		</div>
	)
}

interface StopIconProps {
	modes: string[];
}

export default StopIcon;
