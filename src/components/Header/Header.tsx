import { useTranslations } from "next-intl";

export const Header = () => {
  const t = useTranslations('HomePage');
  const title = t('title');
  return <div>Header title={title}</div>
}