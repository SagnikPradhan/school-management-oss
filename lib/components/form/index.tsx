import { Field, Form as FormikForm, Formik, FormikHelpers } from "formik";
import * as z from "zod";

type InitalValueWithValidator = Record<
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
  onSubmit: (
    values: GetInitialValues<V>,
    formikHelpers: FormikHelpers<GetInitialValues<V>>
  ) => void;
}) => {
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

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <FormikForm>
        {Object.entries(values).map(([key, [_, validator, type]]) => (
          <div>
            <label htmlFor={key}>{key}</label>
            <Field
              name={key}
              type={type}
              validate={validationWrapper(validator)}
            />
          </div>
        ))}

        <button type="submit">Submit</button>
      </FormikForm>
    </Formik>
  );
};
