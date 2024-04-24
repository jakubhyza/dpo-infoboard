import { Navigate } from "react-router-dom";
import SignEditor from "../components/editor/SignEditor";
import Layout from "../components/layout/Layout";
import { createSign } from "../lib/api";
import { useState } from "react";
import ProtectLogin from "../components/protect/ProtectLogin";


function PageSignEditor() {
	const [redirect, setRedirect] = useState(false);

	if (redirect) {
		return <Navigate to="/admin/signs" />;
	}

	return (
		<Layout>
			<ProtectLogin>
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
			</ProtectLogin>
		</Layout>
	);
}
export default PageSignEditor;
