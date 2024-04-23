import style from './StopSignWidget.module.css';

function StopSignHeading(props: StopSignHeadingProps) {
	return (
		<div className={style.StopSignHeading}>
			{props.title}
		</div>
	)
}

interface StopSignHeadingProps {
	title: string;
}

export default StopSignHeading;
