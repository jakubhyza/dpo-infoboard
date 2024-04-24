import { useCallback, useState } from "react";
import Layout from "../components/layout/Layout";
import { isLoggedIn, login } from "../lib/api";
import { Navigate } from "react-router-dom";

function PageLogin() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [redirect, setRedirect] = useState(false);
	const loggedIn = isLoggedIn();

	const handleSubmit = useCallback(async () => {
		const loggedIn = await login(username, password);

		if (loggedIn) {
			setError(null);
			setRedirect(true);
		} else {
			setUsername('');
			setPassword('');
			setError('Neplatné přihlašovací údaje');
		}
	}, [username, password]);

	if (redirect) {
		return (
			<Navigate to="/admin/signs" />
		);
	}

	if (loggedIn) {
		return (
			<Layout>
				<h1>Jste již přihlášen</h1>
			</Layout>
		)
	}

	return (
		<Layout>
			<h1>Přihlásit se</h1>
			<form onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}>
				{error && <div style={{ color: 'red' }}>{error}</div>}
				<label>
					Uživatelské jméno:
					<input type="text" placeholder="admin" required value={username} onChange={(e) => setUsername(e.target.value)} />
				</label>
				<br />
				<br />
				<label>
					Heslo:
					<input type="password" placeholder="******" required value={password} onChange={(e) => setPassword(e.target.value)} />
				</label>
				<br />
				<br />
				<button type="submit">Přihlásit se</button>
			</form>
		</Layout>
	)
}
export default PageLogin;
