import { tagTypes } from "../features/tag-types";
import { baseApi } from "./baseApi";

const quiz_url = "/quizzes";
const question_url = "/questions";

export const quizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create quiz
    createQuiz: build.mutation({
      query: (payload) => ({
        url: `${quiz_url}`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.quiz],
    }),
    // quizzes
    quizzes: build.query({
      query: () => ({
        url: `${quiz_url}`,
        method: "GET",
      }),
      providesTags: [tagTypes.quiz],
    }),
    // quiz
    quiz: build.query({
      query: (id) => ({
        url: `${quiz_url}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.quiz],
    }),
    // quiz quiz
    updateQuiz: build.mutation({
      query: ({ id, ...payload }) => ({
        url: `${quiz_url}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.quiz],
    }),
    // delete quiz
    deleteQuiz: build.mutation({
      query: (id) => ({
        url: `${quiz_url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.quiz],
    }),

    //---------------------------

    // quiz questions
    createQuizQuestion: build.mutation({
      query: (payload) => ({
        url: `${question_url}`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.question],
    }),

    // get all quiz questions
    getAllQuestions: build.query({
      query: () => ({
        url: `${question_url}`,
        method: "GET",
      }),
      providesTags: [tagTypes.question],
    }),

    //update quiz question
    updateQuizQuestion: build.mutation({
      query: ({ id, ...payload }) => ({
        url: `${question_url}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.question],
    }),

    // delete quiz question
    deleteQuizQuestion: build.mutation({
      query: (id) => ({
        url: `${question_url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.question],
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useQuizzesQuery,
  useQuizQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useCreateQuizQuestionMutation,
  useGetAllQuestionsQuery,
  useUpdateQuizQuestionMutation,
  useDeleteQuizQuestionMutation,
} = quizApi;
