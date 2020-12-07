import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "lib/types/user";

export const { reducer, actions } = createSlice({
  name: "user",
  initialState: null as User | null,
  reducers: {
    update: (_, action: PayloadAction<User | null>) => action.payload,
  },
});
