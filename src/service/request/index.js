import axios from "axios";
import { Toast } from "antd-mobile";
let SHOW_LOADING = true;
class WHRequest {
  instance;
  interceptors;
  loading;
  showLoading;
  constructor(config) {
    this.instance = axios.create(config);

    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? SHOW_LOADING;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 所有请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("-----所有拦截-----");
        // console.log(config);
        // if (config.method == "post") {
        //   config.headers = {
        //     "Content-Type": "12312",
        //   };
        // }
        // 可加加载框
        if (this.showLoading == true) {
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    // 所有响应完成
    this.instance.interceptors.response.use(
      (res) => {
        // 清除加载框
        this.loading?.close();

        // console.log("-----所有响应-----");
        return res;
      },
      (err) => {
        // 清除加载框
        this.loading?.close();

        return err;
      }
    );
  }

  request(config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.showLoading == false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = SHOW_LOADING;

          resolve(res);
        })
        .catch((err) => {
          this.showLoading = SHOW_LOADING;
          Toast.show({
            content: "请求异常，请稍后再试...",
          });
          reject(err);
          return err;
        });
    });
  }
  get(config) {
    return this.request({ ...config, method: "get" });
  }
  post(config) {
    return this.request({ ...config, method: "post" });
  }

  put(config) {
    return this.request({ ...config, method: "put" });
  }
  // ...
}

export default WHRequest;
