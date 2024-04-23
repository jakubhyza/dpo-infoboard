import { useState } from "react";
import { DpoStopGroup } from "../types/dpo-api.types";
import StopInput from "../components/stop-input/StopInput";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

function PageIndex() {
	const [stop, setStop] = useState<DpoStopGroup | null>(null);

	return (
		<Layout>
			<h2>Project VAJ 2024</h2>
			<p>
				This project was written by Jakub Hýža (HYZ0013). It allows you to create infoboards showing information about public transport in Ostrava. I chosed this topic because it is something I wanted to do for a long time but had no time to do it.
			</p>

			<h3>Source of data</h3>
			<p>
				The source of data is https://scc.dpo.cz/dashboard/ (Dopravní podnik Ostrava) <br />
				App uses only publicly available endpoints and it is able to automaticly detect public API key but if you want to use this app more than just for testing purposes it would be probablly better to ask DPO if you can use it and get your own API key.<br />
				App is also trying minimize the number of requests to the API as much as possible.
			</p>

			<h3>Requirements</h3>
			<p>This app was build on</p>
			<ul>
				<li>Node.js v20.6.1</li>
				<li>npm v10.5.2</li>
			</ul>

			<h3>Setup instructions (dev environment)</h3>
			<ol>
				<li>Clone this repository</li>
				<li>Run `npm install` in both `be` and `fe` folders</li>
			</ol>

			<h3>Running the app (dev environment)</h3>
			<ol>
				<li>Run `npm run dev` in `be` folder and let it run</li>
				<li>Run `npm run dev` in `fe` folder ale let it run</li>
			</ol>

			<p>
				API is running on `http://localhost:8080` <br />
				Client is running on `http://localhost:5173`
			</p>

			<h3>Playground</h3>
			<StopInput value={stop} onChange={(stop) => setStop(stop)} />
			{stop && (
				<Link to={`/simple-stop/${stop.id}`}>Zobrazit zastávku</Link>
			)}
		</Layout>
	)
}
export default PageIndex;
