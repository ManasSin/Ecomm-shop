import { USERS_URL } from "../constants";
import { authSlice } from "../slices/authSlice";

export const usersApiSlice = authSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: USERS_URL / login,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
