import React, { Suspense, useEffect, memo } from "react";
import { Mask, DotLoading } from "antd-mobile";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import routes from "./routes";
import IndexStyle from "./index.module.less";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { feachInfoData } from "@/store/features/Info.js";
// 统一路由配置
const Element = memo((props) => {
  // 获取toures中路由信息
  let { component: Component, meta, path } = props;
  // console.log(props);
  // 登录态校验
  // 1.获取redux中数据
  const { Info } = useSelector(
    (state) => ({
      Info: state.infoData.Info,
    }),
    shallowEqual
  );
  const dispath = useDispatch();

  // 2.需要登录的页面
  const checkList = ["/personal", "/store", "/update"];
  // 如果info为空，且当前页面在checkList中，就从服务器获取登陆者信息
  useEffect(() => {
    (async () => {
      if (!Info && checkList.includes(path)) {
        const { payload } = await dispath(feachInfoData());
        // 如果没有获取到信息就跳转到登录页面
        console.log(payload);
        if (!payload) {
          console.log(payload);

          navigate(
            {
              pathname: "/login",
              search: `?to=${path}`,
            },
            { replace: true }
          );
          return;
        }
      }
    })();
  }, [dispath, Info, path]);
  // 修改页面的title
  const { title = "知乎夜报-WebApp" } = meta ?? {};
  document.title = title;

  // 获取路由信息，基于属性传递给组件
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [usp] = useSearchParams();
  return (
    <Component
      navigate={navigate}
      location={location}
      params={params}
      usp={usp}
    />
  );
});

export default function RouterView() {
  return (
    <Suspense
      fallback={
        <Mask visible={true} opacity="thick">
          <DotLoading className={IndexStyle.loadingCenter} color="white" />
        </Mask>
      }
    >
      <Routes>
        {routes.map((route, index) => {
          let { name, path } = route;
          return (
            <Route key={name} path={path} element={<Element {...route} />} />
          );
        })}
      </Routes>
    </Suspense>
  );
}
