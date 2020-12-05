import {
  configureStore,
  combineReducers,
  EnhancedStore,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { reducers } from "./reducer";

export type State = StateFromReducersMapObject<typeof reducers>;

let store: EnhancedStore | undefined = undefined;

const initialState: State = {
  user: null,
};

function initStore(preloadedState: State = initialState) {
  return configureStore({
    reducer: combineReducers(reducers),
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const initializeStore = (preloadedState: State) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};
