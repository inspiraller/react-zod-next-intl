import { DialogInForm } from "@/components/Dialog/DialogInForm";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import styles from "./Success.Dialog.module.scss";

export const Success = () => {
  const methods = useFormContext();
  const { reset, getValues } = methods;
  const handleClose = () => {
    reset();
  };
  const email = getValues('regEmail');
  const t = useTranslations("Register");
  const T_registeredSuccess = t.rich("RegisterSuccess", {
    p: (child) => <p>{child}</p>,
    strong: (child) => <strong>{child}</strong>,
    email
  });
  return (
    <DialogInForm
      id="registerSuccess"
      isShow={true}
      handleClose={handleClose}
      className={styles.registerSuccess}
    >
      {T_registeredSuccess}
    </DialogInForm>
  );
};
