import { IMeta } from "@/type";
import { baseApi } from "../baseUrl";
import { tagType } from "../tagType";

const registerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userCreate: build.mutation({
      query: (Data) => ({
        url: "/users/create-user",
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [tagType.user],
    }),
    userAdmin: build.mutation({
      query: (Data) => ({
        url: "/users/create-admin",
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [tagType.user],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagType.user],
    }),
    deleteUser: build.mutation({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagType.user],
    }),
    getAllUser: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          users: response.data,
          meta,
        };
      },
      providesTags: [tagType.user],
    }),
  }),
});

export const {
  useUserCreateMutation,
  useUserAdminMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} = registerApi;
