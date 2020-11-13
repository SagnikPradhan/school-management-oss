import { Dispatch, useEffect, useReducer, useState } from "react"
import * as z from "zod"

/**
 * useForm hook
 */
export function useForm<F extends string>(): {
  error: boolean
  state: FormState<F>
  register: ReturnType<typeof registerInputFactory>
} {
  const [ state, dispatchEvent ] = useReducer( reducer, {})
  const [ error, setError ] = useState( false )

  useEffect( () => 
    setError(
      Object
        .values( state )
        .some( ( fieldState ) => typeof fieldState?.error === "string" )
    ),
  [ state ] )

  return {
    error,
    state,
    register: registerInputFactory( dispatchEvent )
  }
}

/**
 * Register input paramters
 */
export interface RegisterInputParams<A, B extends z.ZodTypeDef> {
  name: string
  schema: z.ZodSchema<A, B>
}

/**
 * Form state
 */
export type FormState<F extends string> = Record<F, {
  error: string | null
  value: string | undefined
} | undefined>

/**
 * Reducer for our complex state
 * Validates our input and returns errors
 * 
 * @param state - Form State
 * @param params - Details
 */
function reducer<F extends string>(
  state: FormState<F>,
  [ event, { name, schema } ]: [
    React.ChangeEvent<HTMLInputElement>,
    RegisterInputParams<never, never>
  ]
): FormState<F> {
  const value = event.target.value
  const result = schema.safeParse( value )

  if ( result.success ) return { ...state, [name]: { value, error: null } } 
  else return {
    ...state,
    [ name ]: {
      value: undefined,
      error: result.error.errors[0].message
    }
  }
}

/**
 * Register form input factory
 * 
 * @param dispatchEvent - React dispatch event method
 */
function registerInputFactory(
  dispatchEvent: Dispatch<[
    React.ChangeEvent<HTMLInputElement>,
    RegisterInputParams<never, never>
  ]>
) {
  return function registerInput<A, B extends z.ZodTypeDef>(
    name: string,
    schema: z.ZodSchema<A, B>
  ) {
    return ( event: React.ChangeEvent<HTMLInputElement> ) => {
      dispatchEvent(
        [ event, { name, schema: schema as z.ZodSchema<never, never> } ] 
      )
    }
  }
}
