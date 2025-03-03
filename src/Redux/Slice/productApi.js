import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://blood-donation-server-cjv32ggog-shah-aloms-projects.vercel.app" }),
  tagTypes: ["Task"], 
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Task"], // 🟢 এই API ক্যাশ রাখবে
    }),
    getTaskById: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    addTask: builder.mutation({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"], 
    }),
    updateTask: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: updatedTask,
      }),
      invalidatesTags: ["Task"], 
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
