import {
  ErrorMessage,
  Field,
  Form as FormikForm,
  Formik,
  FormikHelpers,
} from "formik";
import { useState } from "react";
import * as z from "zod";

export type InitalValueWithValidator = Record<
  string,
  [any, z.Schema<any, any>, string]
>;

type GetInitialValues<V extends InitalValueWithValidator> = {
  [K in keyof V]: V[K][0];
};

export const Form = <V extends InitalValueWithValidator>({
  values,
  onSubmit,
}: {
  values: V;
  onSubmit: (values: GetInitialValues<V>) => Promise<void>;
}) => {
  const [error, setError] = useState<string | null>(null);

  const initialValues = Object.fromEntries(
    Object.entries(values).map(([key, [initalValue]]) => [key, initalValue])
  ) as GetInitialValues<V>;

  const validationWrapper = (validator: z.Schema<any, any>) => {
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

  const onSubmitWrapper = (
    values: GetInitialValues<V>,
    formikHelpers: FormikHelpers<GetInitialValues<V>>
  ) => {
    onSubmit(values)
      .then(() => formikHelpers.resetForm())
      .catch((err) => setError(err.message))
      .finally(() => formikHelpers.setSubmitting(false));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitWrapper}>
      <FormikForm>
        {Object.entries(values).map(([key, [_, validator, type]]) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>

            <ErrorMessage name={key} />

            <Field
              name={key}
              type={type}
              validate={validationWrapper(validator)}
            />
          </div>
        ))}

        <div className="errors">{error}</div>

        <button type="submit">Submit</button>
      </FormikForm>
    </Formik>
  );
};
