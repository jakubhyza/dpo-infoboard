import style from './Layout.module.css'
import Menu from './Menu';

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className={style.Layout}>
			<div className={style.LayoutHeader}>
				<Menu />
			</div>
			<div className={style.LayoutContent}>
				{children}
			</div>
		</div>
	);
}
export default Layout;
