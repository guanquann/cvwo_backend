import { apiSlice } from "./apiSlice";

import Cat from "../../interfaces/CategoryInterface";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCats: builder.query<Cat[], void>({
      query: () => "/categories",
    }),

    getCat: builder.query<Cat, string>({
      query: (catId) => `/categories/${catId}`,
    }),
  }),
});

export const { useGetCatsQuery, useGetCatQuery } = extendedApiSlice;
