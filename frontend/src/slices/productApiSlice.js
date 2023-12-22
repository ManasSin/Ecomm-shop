import { PRODUCTS_URL } from "../constants";
import { UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlices";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      keepUnusedDataFor: 10,
      providesTags: ["Products"],
    }),
    getProdcutsDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    UpdateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    removeProductImage: builder.mutation({
      query: (imageName) => ({
        url: `${UPLOAD_URL}/${imageName}}`,
        method: "DELETE",
        // body: imageName,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getTopProduct: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProdcutsDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useRemoveProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductQuery,
} = productApiSlice;
