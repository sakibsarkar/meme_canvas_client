import { TCustomer } from "@/types/customer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: TCustomer | null;
  isLoading: boolean;
};
// Define initial state
const initialState: TAuthState = {
  user: null,
  isLoading: true,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: TCustomer | null }>) {
      state.user = action.payload.user;
      console.log(action.payload.user);

      state.isLoading = false;
    },
    logout(state, action) {
      return { user: null, isLoading: false };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action?.payload || false;
    },

    // Add more reducers as needed
  },
});

export const { setUser, logout,setLoading } = userSlice.actions;
export default userSlice.reducer;
