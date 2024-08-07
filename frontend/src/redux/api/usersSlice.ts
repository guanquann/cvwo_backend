import { apiSlice } from "./apiSlice";

import User from "../../interfaces/UserInterface";

export const extendedApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["User"] }).injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    getUser: builder.query<User, number>({
      query: (userId) => `/users/${userId}`,
    }),

    addUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),

    editUser: builder.mutation({
      query: (user) => ({
        url: `/users/${user.user_id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useAddUserMutation, useEditUserMutation } = extendedApiSlice;
