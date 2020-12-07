import { useEffect, useMemo } from "react";

import { initializeStore, State } from ".";
import { initAuth } from "lib/auth/init";

export function useStore(initialState: State) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  useEffect(() => initAuth(store), []);
  return store;
}
