import { Link, Navigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useState } from "react";
import { deleteSign } from "../lib/api";

function PageSignDelete() {
	const { id } = useParams<{ id: string }>();
	const [redirect, setRedirect] = useState(false);

	if (redirect || !id) {
		return <Navigate to="/admin/signs" />;
	}

	return (
		<Layout>
			<h1>Opravdu chcete smazat tuto tabuli?</h1>
			<p>ID tabule: {id}</p>
			<button onClick={async () => {
				await deleteSign(id);
				setRedirect(true);
			}}>
				Ano, smazat
			</button>
			<Link to="/admin/signs">
				<button>
					Ne, nechci smazat
				</button>
			</Link>
		</Layout>
	);
}
export default PageSignDelete;
