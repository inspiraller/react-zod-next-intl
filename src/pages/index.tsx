import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello from React app</h1>
       <Link href={'/Register'}>Register</Link>
    </main>
  );
}
