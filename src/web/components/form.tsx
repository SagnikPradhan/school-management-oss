import * as z from "zod"
import React from "react"
import { useForm } from "workspace/web/hooks/form"

export type SubmitFn<Form> = ( fields: Record<keyof Form, string> ) => void

export const Form = <F extends string>({
  form,
  submitText,
  onSubmit: clientOnSubmit
}: {
  form: Record<F, {
    // Anything other than any, such as never or unknown doesn't seem to work
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: z.ZodSchema<any, any>
    type: React.InputHTMLAttributes<HTMLInputElement>["type"]
  }>
  submitText: string
  onSubmit: ( fields: Record<keyof typeof form, string> ) => void
}): JSX.Element => {
  const { register, state, error } = useForm()
  const fields: JSX.Element[] = []

  let index = 0
  for ( const name in form ) {
    const { schema, type } = form[ name ]

    const field = (
      <div key={index++} className="field">
        <label htmlFor={name}>{name}</label>
        <input
          id={name}
          className={ state[ name ]?.error ?  "error" : "" } 
          type={type}
          onChange={ register( name, schema ) }
        />

        <style jsx>{`
          .field {
            display: flex;
            flex-direction: column;
            gap: 0.5em;
          }

          input {
            background: white;

            padding: 0.5em;

            color: rgb(35, 35, 35);
            font-size: 0.85rem;
            font-family: 'Open Sans', sans-serif;

            border-radius: 5px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
          }

          label {
            text-transform: capitalize;
          }

          input.error {
            border-color: #DE3C4B;
          }  
        `}</style>
      </div>
    )

    fields.push( field )
  }

  const onSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault()

    const fields = Object.fromEntries(
      Object
        .entries( state )
        .map(
          ( [ field, errorAndValue ] ) => {
            const { value } = errorAndValue || {}
            if ( typeof value === "undefined" )
              throw new Error( "Found field value undefined" )
            else 
              return [ field, value ]
          }
        )
    )

    clientOnSubmit( fields as Record<F, string> )
  }

  return ( 
    <form onSubmit={ onSubmit }>
      { fields }

      <div className="errors">
        {
          Object
            .keys( state )
            .map( ( field, key ) =>  (
              <span key={ key }>{ state[ field ]?.error }</span>
            ) )
        }
      </div>

      <button
        type="submit"
        disabled={
          error ||
          state.email?.value === undefined ||
          state.password?.value === undefined
        }
      >{ submitText }</button>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1em;

          font-size: 0.85rem;

          padding: 1.5rem;
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
        }

        .errors {
          display: flex;
          flex-direction: column;

          color: #DE3C4B;
          font-size: 0.8rem;
        }

        button {
          background: none;
          color: #623CEA;
          border: 1px solid #623CEA;

          font-size: 0.85rem;
          font-family: 'Open Sans', sans-serif;

          padding: 0.5em;
          border-radius: 5px;
          box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        }

        button:hover {
          color: white;
          background: #623CEA;
          box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
        }

        button:disabled, button:disabled:hover {
          color: grey;
          border: grey;
          background: none;
          box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
          cursor: not-allowed;
        }
      `}</style>
    </form> 
  )
}
