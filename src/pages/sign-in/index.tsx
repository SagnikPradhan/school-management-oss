import React from "react"
import dynamic from "next/dynamic"

import { useMedia } from "workspace/web/hooks/media"

const Desktop = dynamic( () => import( "./_desktop" ) )
const Mobile = dynamic( () => import( "./_mobile" ) )

const SignIn: React.FC = () => {
  const [ isMobile, isLoading ] = useMedia( "(max-width: 768px)" )

  if ( isLoading ) return <h1>Loading</h1>
  else return isMobile ? <Mobile /> : <Desktop />
}

export default SignIn
