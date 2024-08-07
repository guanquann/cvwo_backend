import { apiSlice } from "./apiSlice";

import Comment from "../../interfaces/CommentInterface";

export const extendedApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["Comment"] }).injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: ["Comment"],
    }),

    getComment: builder.query<Comment, { postId: string; commentId: string }>({
      query: ({ postId, commentId }) => `/posts/${postId}/comments/${commentId}`,
    }),

    addNewComment: builder.mutation({
      query: (newComment) => ({
        url: `/posts/${newComment.post_id}/comments/`,
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comment", "Post"],
    }),

    editComment: builder.mutation({
      query: (comment) => ({
        url: `/posts/${comment.post_id}/comments/${comment.id}`,
        method: "PATCH",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),

    deleteComment: builder.mutation({
      query: (comment) => ({
        url: `/posts/${comment.post_id}/comments/${comment.id}`,
        method: "DELETE",
        invalidatesTags: ["Comment"],
      }),
      invalidatesTags: ["Comment", "Post"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentQuery,
  useAddNewCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = extendedApiSlice;
