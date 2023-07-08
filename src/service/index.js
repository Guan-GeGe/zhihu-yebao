import WHRequest from "./request";
// import { BASE_URL, TIMEOUT } from "./request/config";
import { storage } from "@/assets/utils";
export default new WHRequest({
  baseURL: import.meta.env.VITE_BASIC_API,
  // baseURL: "https://news-at.zhihu.com/api/4",
  timeout: 100000,
  interceptors: {
    requestInterceptor: (config) => {
      // console.log(config);

      const { url, method } = config;
      // console.log(method);
      console.log("-----请求成功的拦截-----");
      // 处理token，这些都是需要token才可以访问的接口
      let token = storage.get("tk");
      const safeList = [
        "/user_info",
        "/user_update",
        "/store",
        "/store_remove",
        "/store_list",
      ];
      let reg = /\/api(\/[^?#]+)/;
      let [_, $1] = reg.exec(url);

      if (safeList.includes($1)) {
        // console.log("需要token");
        let ContentType = "application/x-www-form-urlencoded";
        method == "post"
          ? (ContentType = "application/x-www-form-urlencoded")
          : null;
        config.headers = {
          Authorization: token,
          "Content-Type": ContentType,
        };
      } else {
        // console.log("不需要token");
      }
      // const token = cache.getCache("token");
      // if (token) {
      //   config.headers = { Authorization: `Bearer ${token}` };
      // }
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log("-----请求失败的拦截-----");
      console.log(err);
      return err;
    },
    responseInterceptor: (config) => {
      console.log("-----响应成功的拦截-----");
      return config;
    },
    responseInterceptorCatch: (err) => {
      console.log(err);
      console.log("-----响应失败的拦截-----");
      return err;
    },
  },
});
