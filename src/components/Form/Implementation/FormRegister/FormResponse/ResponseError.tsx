import { DialogInForm } from "@/components/Dialog/DialogInForm";
import { useTranslations } from "next-intl";

import styles from "./Error.Dialog.module.scss";

interface Props {
  error: string;
}

export const ResponseError = ({error}: Props) => {


  const t = useTranslations("Register");
  const T_registeredError = t.rich("RegisterError", {
    p: (child) => <p>{child}</p>,
    em: (child) => <em>{child}</em>,
    error
  });
  return (
    <DialogInForm
      id="registerError"
      isShow={true}
      className={styles.registerError}
    >
      {T_registeredError}
    </DialogInForm>
  );
};
