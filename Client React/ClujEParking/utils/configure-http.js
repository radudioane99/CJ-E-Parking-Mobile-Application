import axios from "axios";

export const getUrl = (subUrl) => {
  return "https://efda-5-14-148-17.ngrok.io" + subUrl;
};
const myHttp = axios.create({
  baseURL: "https://efda-5-14-148-17.ngrok.io/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

myHttp.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error && error.response /*&& error.response.data*/) {
      //const originalRequest = error.config;
      const {
        response: { status },
      } = error;

      return Promise.reject(error.response);
    } else return Promise.reject("Server error");
  }
);

export default myHttp;
