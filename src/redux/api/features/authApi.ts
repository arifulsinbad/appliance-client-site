import { baseApi } from "../baseUrl";
import { tagType } from "../tagType";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: "/auth/signin",
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagType.user],
    }),
  }),
});

export const { useUserLoginMutation } = authApi;
