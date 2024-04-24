import { isLoggedIn } from "../../lib/api";
import MenuButton from "../../atomic/MenuButton";



function Menu() {
	const loggedIn = isLoggedIn();
	return (
		<div className="menu">
			<MenuButton to="/">Popis projektu</MenuButton>
			<MenuButton show={loggedIn} to="/admin/signs">Úprava tabulí</MenuButton>
			<MenuButton show={loggedIn} to="/admin/new/sign">Nová tabule</MenuButton>
			<MenuButton show={loggedIn} to="/admin/logout">Odhlásit se</MenuButton>
			<MenuButton show={!loggedIn} to="/admin/login">Přihlášení</MenuButton>
		</div>
	)
}
export default Menu;
