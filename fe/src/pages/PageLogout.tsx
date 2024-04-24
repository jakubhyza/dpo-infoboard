import { useCallback, useState } from "react";
import { isLoggedIn, logout } from "../lib/api";
import Layout from "../components/layout/Layout";
import { Navigate } from "react-router-dom";

function PageLogout() {
	const loggedIn = isLoggedIn();
	const [redirect, setRedirect] = useState(!loggedIn);

	const handleLogout = useCallback(async () => {
		await logout();
		setRedirect(true);
	}, []);

	if (redirect) {
		return (
			<Navigate to="/admin/login" />
		);
	}

	if (!loggedIn) {
		return (
			<Layout>
				<h1>Nejste přihlášen</h1>
			</Layout>
		);
	}

	return (
		<Layout>
			<h1>Odhlášení</h1>
			<button onClick={handleLogout}>Odhlásit se</button>
		</Layout>
	);
}

export default PageLogout;
