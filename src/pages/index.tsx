import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useTranslations} from 'next-intl';
import styles from './Register.module.css';
import { FormExample } from "@/components/FormExample/FormExample";
import withPageComponent from "@/hocs/withPageComponent";
const queryClient = new QueryClient();


const Main = ()  => {
  const t = useTranslations('Register');
  const T_title = t('title');
  const T_h1 = t('h1');

  return (
    <main>
      <Head>
        <title>{T_title}</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <h1 className={styles.h1}>{T_h1}</h1>
        <FormExample />
      </QueryClientProvider>
    </main>
  );
}


/* eslint-enable @typescript-eslint/no-explicit-any */
export async function getStaticProps(context: any) {
  const locale = context.locale ?? 'en';
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default
    }
  };
}

export default withPageComponent(Main);