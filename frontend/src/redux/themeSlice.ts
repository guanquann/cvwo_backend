import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: window.localStorage.getItem("mode") || "light",
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      const new_mode = state.mode === "light" ? "dark" : "light";
      window.localStorage.setItem("mode", new_mode);
      state.mode = new_mode;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
