import { Navigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useState } from "react";
import { deleteSign } from "../lib/api";
import ProtectLogin from "../components/protect/ProtectLogin";
import Button from "../atomic/Button";

function PageSignDelete() {
	const { id } = useParams<{ id: string }>();
	const [redirect, setRedirect] = useState(false);

	if (redirect || !id) {
		return <Navigate to="/admin/signs" />;
	}

	return (
		<Layout>
			<ProtectLogin>
				<h1>Opravdu chcete smazat tuto tabuli?</h1>
				<p>ID tabule: {id}</p>
				<div style={{display: 'flex', gap: '1rem'}}>
					<Button type="danger" onClick={async () => {
						await deleteSign(id);
						setRedirect(true);
					}}>
						Ano, smazat
					</Button>
					<Button to="/admin/signs">
						Ne, nechci smazat
					</Button>
				</div>
			</ProtectLogin>
		</Layout>
	);
}
export default PageSignDelete;
