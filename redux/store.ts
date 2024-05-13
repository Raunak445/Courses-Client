"use client"; // This line seems unusual; it's not a standard JavaScript or TypeScript syntax. Make sure it's intended or remove it if unnecessary.

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

// Create the Redux store
export const store = configureStore({
  reducer: {
    // Configure reducers
    [apiSlice.reducerPath]: apiSlice.reducer, // Add API slice reducer to the store
    auth: authSlice, // Add auth slice reducer to the store
  },
  devTools: true, // Disable Redux DevTools extension in production
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Apply API middleware
});

// Debugging statements
console.log("Redux store created:", store.getState()); // Log initial state of the store

//call refrehsh token funtion on every page reload

const intializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

intializeApp();
