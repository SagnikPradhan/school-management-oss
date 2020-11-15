import { useEffect, useState } from "react"

export function useMedia<T extends unknown>(
  queries: string[],
  values: T[],
  defaultValue: T
): T {
  const mediaQueryLists = queries.map(
    query => window.matchMedia( query )
  )

  const getValue = (): T => {
    const index = mediaQueryLists.findIndex(
      ( mediaQueryList ) => mediaQueryList.matches
    )
    
    return values[ index ] ?? defaultValue
  }

  const [ value, setValue ] = useState( getValue )

  useEffect(
    () => {
      const handler = () => setValue( getValue )
  
      mediaQueryLists.forEach(
        ( mediaQueryList ) => mediaQueryList.addEventListener( "change", handler )
      )

      return () => mediaQueryLists.forEach(
        ( mediaQueryList ) => mediaQueryList.removeEventListener( "change", handler )
      )
    }
  )

  return value
}
