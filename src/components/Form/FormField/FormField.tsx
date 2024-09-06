import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import styles from "./FormField.module.css";
import { PropsFormRegister } from "@/@types";

export interface FormFieldProps {
  type: string;
  placeholder: string;
  name: keyof PropsFormRegister;
  id?: string;
  label: string;
  register: UseFormRegister<PropsFormRegister>;
  errors: FieldErrors<PropsFormRegister>;
  valueAsNumber?: boolean;
}

const FormField = (props: FormFieldProps) => {
  const { type, placeholder, name, label, register, errors, valueAsNumber } =
    props;
  const id = props.id ?? name;
  return (
    <div className={styles.row}>
      <label htmlFor={id} className={styles.label}>
        <span className="form-label">{label}:</span>
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={styles.input}
        {...register(name, { valueAsNumber })}
      />
      <div className={styles.error} role="alert">
        <ErrorMessage
          errors={errors}
          name={name}
          render={(msg) => <p>{msg.message}</p>}
        />
      </div>
    </div>
  );
};
export default FormField;
