import { DialogInForm } from "@/components/Dialog/DialogInForm";
import { useTranslations } from "next-intl";
import styles from "./Loading.Dialog.module.scss";

export const Loading = () => {
  const t = useTranslations("Generic");
  const T_Loading = t("loading");
  return (
    <DialogInForm
      id="registerLoading"
      isShow={true}
      className={styles.registerLoading}
    >
      <p>{T_Loading}</p>
    </DialogInForm>
  );
};
