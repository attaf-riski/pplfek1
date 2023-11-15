import Axios from "axios";
const HttpKabKota = Axios.create({
  baseURL: "https://www.emsifa.com",
  timeout: 1000,
});

HttpKabKota.interceptors.request.use(
  (response) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default HttpKabKota;
