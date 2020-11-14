/* eslint-disable @typescript-eslint/no-explicit-any */

import * as z from "zod"
import React from "react"
import { useForm } from "workspace/web/hooks/form"
import { FormField } from "./form-field"

export type SubmitFn<Form> = ( fields: Record<keyof Form, string> ) => void

export const Form = <F extends string>({
  form,
  submitText,
  onSubmit: clientOnSubmit
}: {
  form: Record<F, {
    schema: z.ZodSchema<any, any>
    type: React.InputHTMLAttributes<HTMLInputElement>["type"]
  }>
  submitText: string
  onSubmit: ( fields: Record<keyof typeof form, string> ) => void
}): JSX.Element => {
  // Extract information for useForm
  const formWithoutTypes = {} as Record<F, z.ZodSchema<any, any>>
  for ( const name in form ) {
    const { schema } = form[ name ]
    formWithoutTypes[ name ] = schema
  }

  const { register, state } = useForm( formWithoutTypes )

  // Create the fields
  let index = 0
  const fields: JSX.Element[] = []
  for ( const name in form ) {
    const { type } = form[ name ]
    fields.push( 
      <FormField
        key={ index++ }
        error={ !!state.errors[ name ] }
        name={ name }
        onChangeEvent={ register( name ) }
        type={ type }
      /> 
    )
  }

  // On submit event
  const onSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault()

    const fields = Object.fromEntries(
      Object
        .entries( state.values )
        .map(
          ( [ name, value ] ) => {
            if ( typeof value === "undefined" )
              throw new Error( "Found field value undefined" )
            else 
              return [ name, value ]
          }
        )
    )

    clientOnSubmit( fields as Record<F, string> )
  }

  return ( 
    <form onSubmit={ onSubmit }>
      { fields }

      <div className="errors">{
        Object
          .values( state.errors )
          .map( ( field ) =>  field )
          .filter( Boolean )
          .map( ( field, key ) => <span key={ key }>{ field }</span> )
      }</div>

      <button
        type="submit"
        disabled={ state.isErrored || !state.isDirty }
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
