import { useState } from "react";

export const useAsync = <
  E = Error,
  R = unknown,
  F extends (...args: any[]) => Promise<R> = (...args: any[]) => Promise<R>
>(
  asyncFunction: F
) => {
  type status = "idle" | "success" | "pending" | "error";

  const [status, setStatus] = useState<status>("idle");
  const [value, setValue] = useState<R | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = (...args: Parameters<F>) => {
    setStatus("pending");
    setValue(null);
    setError(null);

    asyncFunction(...args)
      .then((response) => {
        setValue(response);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  };

  return { execute, status, value, error };
};
