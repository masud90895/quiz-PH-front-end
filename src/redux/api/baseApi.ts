import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../features/tag-types";
import config from "@/config/config";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: config.apiBaseUrl }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
