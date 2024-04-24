import { Link } from "react-router-dom";
import { isLoggedIn } from "../../lib/api";
import { ReactNode } from "react";

function ProtectLogin({ children }: { children: ReactNode }) {
	const loggedIn = isLoggedIn();

	if (loggedIn) {
		return (
			<>{children}</>
		);
	} else {
		return (
			<div>
				<h1>Nejste přihlášen</h1>
				<Link to="/admin/login">Přihlásit se</Link>
			</div>
		);
	}
}
export default ProtectLogin;
