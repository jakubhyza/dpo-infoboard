import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { Infoboard } from "../types/config.types";
import { listSigns } from "../lib/api";
import ProtectLogin from "../components/protect/ProtectLogin";
import styles from './PageSignList.module.css';
import Button from "../atomic/Button";

function PageSignList() {
	const [signs, setSigns] = useState<Infoboard[]>([]);

	useEffect(() => {
		listSigns().then(setSigns);
	}, [setSigns]);

	return (
		<Layout>
			<ProtectLogin>
				<div className={styles.Header}>
					<div>
						<h1>Tabule</h1>
					</div>
					<div>
						<Button to="/admin/new/sign" type="success">
							Vytvořit novou tabuli
						</Button>
					</div>
				</div>
				<div  className={styles.Table}>
					{signs.map((sign) => (
						<div key={sign.id} className={styles.Record}>
							<div className={styles.RecordTitle}>{sign.title}</div>
							<div className={styles.RecordActions}>
								<a
									target="_blank"
									className="button button--primary"
									href={`/sign/${sign.id}`}
								>
									Otevřít
								</a>
								<Button to={`/admin/signs/${sign.id}`}>
									Upravit
								</Button>
								<Button
									to={`/admin/signs/delete/${sign.id}`}
									type="danger"
								>
									Smazat
								</Button>
							</div>
						</div>
					))}
				</div>

			</ProtectLogin>
		</Layout>
	)
}
export default PageSignList;
