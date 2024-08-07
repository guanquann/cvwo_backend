import { apiSlice } from "./apiSlice";

import Credential from "../../interfaces/CredentialInterface";

interface outProps {
  token: string;
  username: string;
  exp: Date;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewToken: builder.mutation<outProps, Credential>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAddNewTokenMutation } = extendedApiSlice;
