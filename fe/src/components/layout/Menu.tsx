import { Link } from "react-router-dom";
import { isLoggedIn } from "../../lib/api";

function Menu() {
	const loggedIn = isLoggedIn();
	return (
		<div className="menu">
			<Link to="/">Popis projektu</Link>
			{loggedIn && <Link to="/admin/signs">Úprava tabulí</Link>}
			{loggedIn && <Link to="/admin/signs/new">Nová tabule</Link>}
			{loggedIn && <Link to="/admin/logout">Odhlásit se</Link>}
			{!loggedIn && <Link to="/admin/login">Přihlášení</Link>}
		</div>
	)
}
export default Menu;
