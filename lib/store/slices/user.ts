import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
  uid: string;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
}

export type User = UserDetails | null;

export const { reducer, actions } = createSlice({
  name: "user",
  initialState: null as User,
  reducers: {
    update: (_, action: PayloadAction<User>) => action.payload,
  },
});
