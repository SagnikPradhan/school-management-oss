import { useEffect, useState } from "react"

export const useMedia = ( media: string ): [ boolean | undefined, boolean ] => {
  const [ match, setMatch ] = useState<boolean>()
  const [ loading, setIsLoading ] = useState<boolean>( true )

  const handler = ( mediaQueryListEvent: MediaQueryListEvent ) => {
    setMatch( mediaQueryListEvent.matches )
  }

  useEffect(
    () => {
      const mediaQueryList = window.matchMedia( media )
      setMatch( mediaQueryList.matches )

      setIsLoading( false )

      mediaQueryList.addEventListener( "change", handler )
      return () => mediaQueryList.removeEventListener( "change", handler )
    }, []
  )

  return [ match, loading ]
}
