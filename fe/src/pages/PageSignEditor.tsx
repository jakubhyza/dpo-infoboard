import { Navigate } from "react-router-dom";
import SignEditor from "../components/editor/SignEditor";
import Layout from "../components/layout/Layout";
import { createSign } from "../lib/api";
import { useState } from "react";


function PageSignEditor() {
	const [redirect, setRedirect] = useState(false);

	if (redirect) {
		return <Navigate to="/admin/signs" />;
	}

	return (
		<Layout>
			<SignEditor
				initialData={{
					backgroundColor: '#000000',
					id: '-1',
					layout: 'simple',
					primaryColor: '#ffa500',
					stops: "",
					title: 'Nová tabule',
				}}
				onSave={async (sign) => {
					await createSign(sign);
					setRedirect(true);
				}}
			/>
		</Layout>
	);
}
export default PageSignEditor;
