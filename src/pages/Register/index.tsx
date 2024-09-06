import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useTranslations} from 'next-intl';
import styles from './Register.module.css';
import { FormRegister } from "@/components/Form/Implementation/FormRegister/FormRegister";
const queryClient = new QueryClient();


export default function Register() {
  const t = useTranslations('Register');
  const T_title = t('title');

  return (
    <main>
      <Head>
        <title>{T_title}</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <h1 className={styles.h1}>Register</h1>
        <FormRegister />
      </QueryClientProvider>
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