import { useState } from "react"
import { AppError, Errors } from "u/error"

const useAsync = <
  E extends keyof Errors,
  R,
  F extends (...args: any[]) => Promise<R>
>(
  asyncFunction: F
) => {
  const [status, setStatus] = useState("idle")
  const [value, setValue] = useState<R | null>(null)
  const [error, setError] = useState<AppError<E> | null>(null)

  const execute = (...args: Parameters<F>) => {
    setStatus("pending")
    setValue(null)
    setError(null)

    asyncFunction(...args)
      .then((response) => {
        setValue(response)
        setStatus("success")
      })
      .catch((error) => {
        setError(error)
        setStatus("error")
      })
  }

  return { execute, status, value, error }
}

export default useAsync
