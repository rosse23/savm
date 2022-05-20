import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  errorMessage: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action) {
      console.log(action.payload);
      state.isError = true;
      state.errorMessage = action.payload;
    },

    removeError(state, action) {
      state.isError = false;
      state.errorMessage = "";
    },
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice.reducer;
