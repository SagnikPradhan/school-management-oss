import {
  ErrorMessage,
  Field as FormikField,
  Form as FormikForm,
  Formik,
  FormikConfig,
  FormikValues,
} from "formik";
import { ReactNode } from "react";
import * as z from "zod";

type FormProps<V> = FormikConfig<V> & { children: ReactNode; id: string };

export const Form = <V extends FormikValues>({
  children,
  id,
  ...props
}: FormProps<V>) => (
  <Formik {...props}>
    <FormikForm id={id}>{children}</FormikForm>
  </Formik>
);

export const Field = <A, B extends z.ZodTypeDef>({
  schema,
  name,
  type,
}: {
  name: string;
  type: string;
  schema: z.Schema<A, B>;
}) => (
  <div>
    <label htmlFor={name}>{name}</label>
    <ErrorMessage name={name} />
    <FormikField name={name} type={type} validate={wrapSchema(schema)} />
  </div>
);

const wrapSchema = (validator: z.Schema<any, any>) => {
  return (value: any): string | void => {
    const result = validator.safeParse(value);

    if (result.success) return;
    else {
      const {
        error: { errors },
      } = result;
      return errors[0]?.message;
    }
  };
};
