import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "lib-flexible";
import { ConfigProvider } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN.js";
import { Provider } from "react-redux";
import store from "./store/index.js";
import "normalize.css";
/* 处理最大宽度 */
(function () {
  const handleMax = function handleMax() {
    let html = document.documentElement,
      root = document.getElementById("root"),
      deviceW = html.clientWidth;
    root.style.maxWidth = "750px";
    if (deviceW >= 750) {
      html.style.fontSize = "75px";
    }
  };
  handleMax();
})();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
  // </React.StrictMode>
);
