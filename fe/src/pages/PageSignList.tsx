import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { Infoboard } from "../types/config.types";
import { listSigns } from "../lib/api";

function PageSignList() {
	const [signs, setSigns] = useState<Infoboard[]>([]);

	useEffect(() => {
		listSigns().then(setSigns);
	}, [setSigns]);

	return (
		<Layout>
			<h1>Tabule</h1>
			<Link to="/admin/signs/new">
				Vytvořit novou tabuli
			</Link>
			<br />
			<br />
			<table style={{
				width: '100%',
			}}>
				<thead>
					<tr>
						<th>Název</th>
						<th>Akce</th>
					</tr>
				</thead>
				<tbody>
					{signs.map((sign) => (
						<tr key={sign.id}>
							<td>{sign.title}</td>
							<td style={{
								textAlign: 'right',
							}}>
								<a target="_blank" href={`/sign/${sign.id}`}>Otevřít</a>
								{' '}
								<Link to={`/admin/signs/${sign.id}`}>
									Upravit
								</Link>
								{' '}
								<Link to={`/admin/signs/delete/${sign.id}`} style={{color: 'red'}}>Smazat</Link>
							</td>
						</tr>

					))}
				</tbody>
			</table>
		</Layout>
	)
}
export default PageSignList;
