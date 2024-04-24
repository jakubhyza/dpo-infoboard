import { Link } from "react-router-dom";

function Button(props: ButtonProps) {
	const type = props.type || 'default';

	if (props.onClick && props.to) {
		return 'You can only use "onClick" or "to", not both';
	}
	if (!props.onClick && !props.to) {
		return 'You must use "onClick" or "to"';
	}

	if (props.onClick) {
		return (
			<button
				onClick={props.onClick}
				className={`button button--${type}`}
				type="button"
				style={props.style}
			>{props.children}</button>
		);
	}
	else if (props.to) {
		return (
			<Link
				to={props.to}
				className={`button button--${type}`}
				style={props.style}
			>{props.children}</Link>
		);
	}
}

interface ButtonProps {
	onClick?: () => void;
	to?: string;
	children?: React.ReactNode;
	type?: 'default' | 'success' | 'primary' | 'danger';
	style?: React.CSSProperties;
}

export default Button;
