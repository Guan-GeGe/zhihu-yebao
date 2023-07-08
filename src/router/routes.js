import { lazy } from "react";
import Home from "@/views/Home/Home.jsx";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "知乎夜报-WebApp",
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: lazy(() => import("@/views/Detail/Detail.jsx")),
    meta: {
      title: "新闻详情-知乎夜报",
    },
  },
  {
    path: "/personal",
    name: "detail",
    component: lazy(() => import("@/views/Personal/Personal.jsx")),
    meta: {
      title: "个人中心-知乎夜报",
    },
  },
  {
    path: "/store",
    name: "store",
    component: lazy(() => import("@/views/Store/Store.jsx")),
    meta: {
      title: "我的收藏-知乎夜报",
    },
  },
  {
    path: "/update",
    name: "update",
    component: lazy(() => import("@/views/Update/Update.jsx")),
    meta: {
      title: "修改个人信息-知乎夜报",
    },
  },
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("@/views/Login/Login.jsx")),
    meta: {
      title: "登录注册-知乎夜报",
    },
  },
  {
    path: "*",
    name: "404",
    component: lazy(() => import("@/views/Page404/Page404.jsx")),
    meta: {
      title: "404-知乎夜报",
    },
  },
];

export default routes;
