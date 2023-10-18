import { IMeta } from "@/type";
import { baseApi } from "../baseUrl";
import { tagType } from "../tagType";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    bookingService: build.mutation({
      query: (data) => ({
        url: "/bookingServices",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagType.bookingServices],
    }),
    updateBooking: build.mutation({
      query: (data) => ({
        url: `/bookingServices/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagType.bookingServices],
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `/bookingServices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagType.bookingServices],
    }),
    getBooking: build.query({
      query: (id) => ({
        url: `/bookingServices/${id}`,
        method: "GET",
      }),
      providesTags: [tagType.bookingServices],
    }),
    bookingServices: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/bookingServices",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any, meta: IMeta) => {
        return {
          bookingServices: response.data,
          meta,
        };
      },
      providesTags: [tagType.bookingServices],
    }),
  }),
});

export const {
  useBookingServiceMutation,
  useBookingServicesQuery,
  useDeleteBookingMutation,
  useGetBookingQuery,
  useUpdateBookingMutation,
} = bookingApi;
