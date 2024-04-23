import Layout from "../components/layout/Layout";

function PageIndex() {
	return (
		<Layout>
			<h2>Project VAJ 2024</h2>
			<p>
				Tento projekt vytvořil Jakub Hýža (HYZ0013). Jedná se o systém který umožňuje vytvářet informační tabule s informacemi o zastávkách Dopravního Podniku Ostrava.<br />
				Toto téma jsem si vybral, jelikož se jedná o něco co jsem chtěl již delší dobu naprogramovat ale neměl jsem na to dostatek času.
			</p>

			<h3>Zdroj dat</h3>
			<p>
				Zdrojem dat je <a target="_blank" href="https://scc.dpo.cz/dashboard/">https://scc.dpo.cz/dashboard/</a> (<a target="_blank" href="https://dpo.cz">Dopravní podnik Ostrava</a>)<br />
				Aplikace používá pouze veřejně dostuné endpointy a je schopná si sama zjistit veřejný API klíč, nicméně pokud chcete tuto aplikaci použít jinak než jen pro testovací účely, bylo by vhodné se zeptat DPO zda můžete API používat a získat si vlastní API klíč.<br />
				Aplikace se snaží minimalizovat počet requestů na API na minimum.
			</p>
¨
			<h3>Technické požadavky</h3>
			<ul>
				<li>Node.js v20.6.1</li>
				<li>npm v10.5.2</li>
			</ul>

			<h3>Setup instructions (dev environment)</h3>
			<ol>
				<li>Clone this repository</li>
				<li>Run `npm install` in both `be` and `fe` folders</li>
				<li>Run `npm run migrate` in `be` folder</li>
			</ol>

			<h3>Running the app (dev environment)</h3>
			<ol>
				<li>Run `npm start` in `be` folder and let it run</li>
				<li>Run `npm run dev` in `fe` folder ale let it run</li>
			</ol>

			<p>
				API is running on `http://localhost:8080` <br />
				Client is running on `http://localhost:5173`
			</p>

			<h3>Ukázka aplikace</h3>
			<p>
				Nahoře v menu je možné se překliknout na "Úprava tabulí". Zde je možné snadno vytvářet nové tabule a upravovat již existující.<br />
				Vytvořte novou tabuli, nezapomeňte vybrat zastávku. Po uložení se tabule objeví v seznamu a je možné ji otevřít na nové záložce.
			</p>
		</Layout>
	)
}
export default PageIndex;
