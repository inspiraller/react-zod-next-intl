import { useTranslations } from "next-intl";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <main className={styles.main}>
      <h1>{t('title')}</h1>
      <Link href={'/Register'}>Register</Link>
    </main>
  );
}

export async function getStaticProps(context: any) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`@/../messages/${context.locale}.json`)).default
    }
  };
}