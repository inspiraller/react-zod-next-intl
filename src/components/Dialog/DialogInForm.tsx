import clsx from "clsx";
import styles from "./Dialog.module.scss";
import { Button } from "../Form/Button/Button";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface Props {
  id: string;
  children: React.ReactNode;
  isShow?: boolean;
  handleClose?: () => void;
  className: string;
}
export const DialogInForm = ({ id, isShow, handleClose, children, className }: Props) => {
  const tGeneric = useTranslations("Generic");
  const T_close = tGeneric("close");

  const [show, setShow] = useState<boolean | undefined>(isShow);
  
  const handleClick = () => {
    console.log('handleClick of close button ???')
    handleClose?.();
    setShow(prev => !prev);
  }
  const classDialog = clsx(styles.dialog, show ? styles.show : styles.hide, className);

  return (
    <dialog id={id} aria-modal="true" className={classDialog}>
      {children}
      <section className={styles.actions}>
        <Button type="button" variant="primary" onClick={handleClick}>
          {T_close}
        </Button>
      </section>
    </dialog>
  );
};
