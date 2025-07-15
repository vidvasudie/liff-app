import styles from "./page.module.css";
import LiffProfile from "./liff-profile";

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to LIFF App developed by{" "}
					<a href="https://nextjs.org">Next.js!</a>
				</h1>

				<LiffProfile />
			</main>
		</div>
	);
}
