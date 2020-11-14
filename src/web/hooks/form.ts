import { Dispatch, useReducer } from "react"
import * as z from "zod"

/**
 * useForm hook
 */
export function useForm<
  F extends string,
  A, 
  B extends z.ZodTypeDef,
  S extends Record<F, z.ZodSchema<A, B>>
>( schemas: S ): {
  state: FormState<F>
  register: ( name: F ) => ( ev: React.ChangeEvent<HTMLInputElement> ) => void
} {
  const initialState = { 
    errors: {}, values: {}, isErrored: false, isDirty: false 
  }

  const [ state, dispatchEvent ] = useReducer( reducer, initialState )
  return { state, register: registerInputFactory( dispatchEvent, schemas ) }
}

/**
 * Form state
 */
export interface FormState<F extends string> {
  errors: Record<F, string | undefined>
  values: Record<F, string | undefined>
  isErrored: boolean
  isDirty: boolean
}

/**
 * Internal dispatch params
 */
interface DispatchParams<F extends string> {
  event: React.ChangeEvent<HTMLInputElement>
  name: F
  schema: z.ZodSchema<never, never>
}

/**
 * Reducer for our complex state
 * Validates our input and returns errors
 * 
 * @param state - Form State
 * @param params - Details
 */
function reducer<F extends string>(
  state: FormState<F>,
  { event, name, schema }: DispatchParams<F>
): FormState<F> {
  const value = event.target.value
  const result = schema.safeParse( value )

  const errors = { 
    ...state.errors,
    [ name ]: result.success ? undefined : result.error.errors[0].message
  }

  const values = { 
    ...state.values,
    [ name ]: result.success ? result.data : undefined
  }

  const isErrored = Object.values( errors ).some( Boolean )
  const isDirty = Object.values( values ).every( Boolean )

  return { errors, values, isErrored, isDirty }
}

/**
 * Register form input factory
 * 
 * @param dispatchEvent - React dispatch event method
 */
function registerInputFactory<F extends string, A, B extends z.ZodTypeDef>(
  dispatchEvent: Dispatch<DispatchParams<F>>,
  schemas: Record<F, z.ZodSchema<A, B>>
) {
  return function registerInput(
    name: F
  ) {
    const schema = schemas[ name ]

    return ( event: React.ChangeEvent<HTMLInputElement> ) => {
      dispatchEvent({
        name, 
        schema: schema as z.ZodSchema<never, never>,
        event 
      })
    }
  }
}
