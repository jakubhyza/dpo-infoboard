import React from "react";
import { NavLink } from "react-router-dom";

function MenuButton(props: MenuButtonProps) {
	if (props.show === false) {
		return null;
	}

	return (
		<NavLink
			className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
			to={props.to}
		>
			{props.children}
		</NavLink>
	)
}

interface MenuButtonProps {
	to: string;
	children: React.ReactNode;
	show?: boolean;
}

export default MenuButton
