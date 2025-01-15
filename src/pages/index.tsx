import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useTranslations} from 'next-intl';
import styles from './Register.module.css';
import { FormRegister } from "@/components/Form/Implementation/FormRegister/FormRegister";
import withPageComponent from "@/hocs/withPageComponent";
const queryClient = new QueryClient();


const Register = ()  => {
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


/* eslint-enable @typescript-eslint/no-explicit-any */
export async function getStaticProps(context: any) {
  const locale = context.locale ?? 'en';
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default
    }
  };
}

export default withPageComponent(Register);