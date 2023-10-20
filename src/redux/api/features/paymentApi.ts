import { baseApi } from "../baseUrl";
import { tagType } from "../tagType";

const pamentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    payment: build.mutation({
      query: (data) => ({
        url: "/payments/",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagType.payment],
    }),
    deletePayment: build.mutation({
      query: (id: string) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagType.payment],
    }),
    getPayment: build.query({
      query: () => ({
        url: `/payments`,
        method: "GET",
      }),
      providesTags: [tagType.payment],
    }),
  }),
});

export const {
  useDeletePaymentMutation,
  useGetPaymentQuery,
  usePaymentMutation,
} = pamentApi;
