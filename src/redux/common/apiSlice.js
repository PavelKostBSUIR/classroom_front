import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "../auth/authSlice";

const baseQueryCreator = (path, getHeaders) =>
  fetchBaseQuery({
    baseUrl: path,
    //credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const customHeaders = getHeaders(getState);
      const token = getState().auth.token;
      customHeaders.forEach((element) => {
        headers.set(element.name, element.value);
      });
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
const baseAuthQuery = baseQueryCreator(
  "http://localhost:8080/api",
  (getState) => {
    const token = getState().auth.token;
    return token ? [{ name: "authorization", value: `Bearer ${token}` }] : [];
  }
);

const baseAuthQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseAuthQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("Access token is invalid.");
    api.dispatch(logOut());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseAuthQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
