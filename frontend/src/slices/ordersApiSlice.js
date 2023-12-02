import { apiSlice } from "./apiSlices";
import { ORDERS_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/orders`,
        method: "POST",
        body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
