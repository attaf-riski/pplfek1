import Axios, { AxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";
import AuthUser from "./AuthUser";
import AuthAttributes from "../inteface/AuthUserInterface";
import Http from "./Fetch";

const HttpMultipart = Axios.create({
  baseURL: "http://localhost:5502",
  timeout: 1000,
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=<calculated when request is sent>",
  },
});

HttpMultipart.interceptors.request.use(
  async (req: AxiosRequestConfig) => {
    if (req.headers?.Authorization) {
      const authHeader = req.headers?.Authorization;

      const currentToken = authHeader && authHeader.toString().split(" ")[1];

      const decoded: any = currentToken && jwtDecode(currentToken);

      const expired = decoded?.exp;

      const currentDate = new Date();
      if (expired * 1000 < currentDate.getTime()) {
        const resData = await Http.get(
          "http://localhost:5502/user/refresh-token",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response: AuthAttributes = {
          id: resData.data?.data?.id,
          username: resData.data?.data?.username,
          email: resData.data?.data?.email,
          roleId: resData.data?.data?.roleId,
          token: resData.data?.data?.token,
          active: resData.data?.data?.active,
          verified: resData.data?.data?.verified,
        };

        req.headers.Authorization = `Bearer ${resData?.data?.data?.token}`;

        AuthUser.SetAuth(response);
      }
    }

    return req;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

HttpMultipart.interceptors.request.use(
  (response) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default HttpMultipart;
