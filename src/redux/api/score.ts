import { baseApi } from "./baseApi";

export const scoreApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Login
    getScore: build.query({
      query: () => ({
        url: `/score`,
        method: "GET",
      }),
    }),
    // My Profile
    updateScore: build.mutation({
      query: (score) => ({
        url: `/score`,
        method: "POST",
        data: score,
      }),
    }),
  }),
});

export const { useGetScoreQuery, useUpdateScoreMutation } = scoreApi;