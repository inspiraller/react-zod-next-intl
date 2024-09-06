import {useTranslations} from 'next-intl';
import { memo } from 'react';


export const Title = memo(function Title() {
  const t = useTranslations('HomePage');
  return <h1>{t('title')}</h1>;
});

