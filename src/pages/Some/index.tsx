import Head from "next/head";

import {useTranslations} from 'next-intl';



export default function Some() {
  const t = useTranslations('Register');
  const T_title = t('title');

  return (
    <main>
      <Head>
        <title>{T_title}</title>
      </Head>
     
    </main>
  );
}


export async function getStaticProps(context: any) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`@/messages/${context.locale}.json`)).default
    }
  };
}