import { redirect } from "next/navigation";
import { userLoggedIn } from "../auth/authSlice";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "refresh",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    loadUser: builder.query({
      query: (data) => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user:result.data.user
            })
          );
        } catch (error: any) {
          console.log(error);
          // toast.error("Please login to access this resource")
          // redirect('/')
          
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery,useLoadUserQuery } = apiSlice;
