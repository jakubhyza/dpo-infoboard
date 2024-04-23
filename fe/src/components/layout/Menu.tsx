import { Link } from "react-router-dom";

function Menu() {
	return (
		<>
			<Link to="/">Popis projektu</Link>
			<Link to="/admin/signs">Úprava tabulí</Link>
		</>
	)
}
export default Menu;
