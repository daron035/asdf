import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setAuth, logout } from "../features/authSlice";
import { Mutex } from "async-mutex";

import { getCookie, setCookie, deleteCookie } from "@/utils";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  // baseUrl: `http://127.0.0.1:8000/api`,
  baseUrl: `${process.env.NEXT_PUBLIC_RTKQ}/api`,
  prepareHeaders(headers) {
    return headers;
  },
  // prepareHeaders: (headers) => {
  //   // getCookie("");
  //   // const a = getCookie("csrftoken");
  //   // console.log("asd", a);
  //   // headers.set("Accept-Language", `asdfasiodfuiaosjdfioasjdf`);
  //   return headers;
  // },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: "auth/jwt/refresh/",
            method: "POST",
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          api.dispatch(setAuth());
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
