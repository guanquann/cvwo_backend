import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Post from "../../interfaces/PostInterface";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NODE_ENV === "production" ? "https://cvwo.onrender.com/" : "http://localhost:3000/",
    prepareHeaders: (headers) => {
      const authData = window.localStorage.getItem("authData");
      headers.set("authorization", authData ? authData : "");
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], string | null>({
      query: (sort = "date") => `/posts?sort=${sort}`,
      providesTags: ["Post"],
    }),

    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: ["Post"],
    }),

    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Post"],
    }),

    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    addNewVote: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}/votes`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useAddNewVoteMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = apiSlice;
