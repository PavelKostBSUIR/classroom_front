import { apiSlice } from "../common/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/member`,
      providesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => `/members`,
      providesTags: ["User"],
    }),
    sendUserToggleHand: builder.mutation({
      query: () => ({
        url: "/member",
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useSendUserToggleHandMutation,
  useLazyGetUsersQuery,
  useLazyGetUserQuery,
} = usersApiSlice;
