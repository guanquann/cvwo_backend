import { apiSlice } from "./apiSlice";

import Post from "../../interfaces/PostInterface";
import Thread from "../../interfaces/ThreadInterface";

export const extendedApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["Thread"] }).injectEndpoints({
  endpoints: (builder) => ({
    getThreads: builder.query<Thread[], void>({
      query: () => "/post_threads",
      providesTags: ["Thread"],
    }),

    getThread: builder.query<Post[], { threadId: string; sort: string | null }>({
      query: ({ threadId, sort = "date" }) => `/post_threads/${threadId}?sort=${sort}`,
    }),

    addNewThread: builder.mutation({
      query: (newThread) => ({
        url: "/post_threads",
        method: "POST",
        body: newThread,
      }),
      invalidatesTags: ["Thread"],
    }),
  }),
});

export const { useGetThreadsQuery, useGetThreadQuery, useAddNewThreadMutation } = extendedApiSlice;
