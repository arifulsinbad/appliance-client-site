import { IMeta } from "@/type";
import { baseApi } from "../baseUrl";
import { tagType } from "../tagType";

const repairingCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    repairingCategory: build.mutation({
      query: (data) => ({
        url: "/repairingCategories",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagType.repairingCategory],
    }),
    categoryReview: build.mutation({
      query: (Data) => ({
        url: "/repairingCategories/review",
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [tagType.repairingCategory],
    }),
    categoryRating: build.mutation({
      query: (Data) => ({
        url: "/repairingCategories/rating",
        method: "PATCH",
        data: Data,
      }),
      invalidatesTags: [tagType.repairingCategory],
    }),
    bookingIncrement: build.mutation({
      query: (Data) => ({
        url: "/repairingCategories/booking-increamnent",
        method: "PATCH",
        data: Data,
      }),
      invalidatesTags: [tagType.repairingCategory],
    }),
    bookingDecreament: build.mutation({
      query: (Data) => ({
        url: "/repairingCategories/booking-decreament",
        method: "PATCH",
        data: Data,
      }),
      invalidatesTags: [tagType.repairingCategory],
    }),
    updateRepairingCategory: build.mutation({
      query: (data) => ({
        url: `/repairingCategories/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagType.repairingCategory],
    }),
    deleteRepairingCategory: build.mutation({
      query: (id) => ({
        url: `/repairingCategories/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagType.repairingCategory],
    }),
    repairingCategories: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/repairingCategories",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any, meta: IMeta) => {
        return {
          repairingCategories: response,
          meta,
        };
      },
      providesTags: [tagType.repairingCategory],
    }),
    getRepairingCategory: build.query({
      query: (id) => {
        return {
          url: `/repairingCategories/${id}`,
          method: "GET",
        };
      },

      providesTags: [tagType.repairingCategory],
    }),
  }),
});

export const {
  useBookingDecreamentMutation,
  useBookingIncrementMutation,
  useCategoryRatingMutation,
  useCategoryReviewMutation,
  useDeleteRepairingCategoryMutation,
  useRepairingCategoriesQuery,
  useRepairingCategoryMutation,
  useUpdateRepairingCategoryMutation,
  useGetRepairingCategoryQuery,
} = repairingCategoryApi;
