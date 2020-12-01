import { useEffect } from "react"
import { useRouter } from "next/router"
import { useUser } from "u/contexts/user"

export default function Dashboard() {
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!user) router.push("/sign-in")
  }, [user])

  return <div>Hey there</div>
}
