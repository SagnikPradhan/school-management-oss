import { createContext, useContext, useEffect, useState } from "react"
import firebase from "../firebase"

const UserContext = createContext<{
  user?: User
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>
  isLoading?: boolean
}>({})

interface User {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
}

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const { displayName, email, photoURL, uid } = user
          setUser({ displayName, email, photoURL, uid })
        } else setUser(undefined)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
