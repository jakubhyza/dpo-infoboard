import { Navigate, useParams } from "react-router-dom";
import SignEditor from "../components/editor/SignEditor";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { Infoboard } from "../types/config.types";
import { loadSign, updateSign } from "../lib/api";
import ProtectLogin from "../components/protect/ProtectLogin";

function PageSignEdit() {
	const id = useParams().id;

	const [loaded, setLoaded] = useState(false);
	const [redirect, setRedirect] = useState<boolean>(!id);
	const [infoboard, setInfoboard] = useState<Infoboard | null>(null);

	useEffect(() => {
		if (id && !loaded) {
			loadSign(id).then(setInfoboard).then(() => setLoaded(true));
		}
	}, [id, loaded]);

	if (redirect) {
		return (
			<Navigate to="/admin/signs" />
		);
	}

	if (!loaded || !infoboard) {
		return (
			<Layout>
				<h1>Načítám data...</h1>
			</Layout>
		);
	}

	return (
		<Layout>
			<ProtectLogin>
				<SignEditor initialData={infoboard} onSave={async (sign) => {
					await updateSign(sign);
					setRedirect(true);
				}} />
			</ProtectLogin>
		</Layout>
	);
}

export default PageSignEdit;
