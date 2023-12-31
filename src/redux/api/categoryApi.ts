import { tagTypes } from "../features/tag-types";
import { baseApi } from "./baseApi";

const CATEGORY_URL = "/category";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create category
    createCategory: build.mutation({
      query: (payload) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    // categories
    categories: build.query({
      query: () => ({
        url: `${CATEGORY_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    // CATEGORY
    category: build.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    // score api

    // delete category
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),

    // update category
    updateCategory: build.mutation({
      query: ({ id, ...payload }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    
  }),
});

export const {
  useCreateCategoryMutation,
  useCategoriesQuery,
  useCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
