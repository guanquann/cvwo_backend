import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    authentication: authReducer,
    theme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
