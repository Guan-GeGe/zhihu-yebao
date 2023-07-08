import React, { memo } from "react";

import { NavBar } from "antd-mobile";
import styled from "./NavBarAgain.module.less";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
const NavBarAgain = memo((props) => {
  let { title } = props;
  const navigate = useNavigate(),
    location = useLocation(),
    [usp] = useSearchParams();
  console.log(location);
  const handleBack = () => {
    // navigate(-1);
    // 对返回进行特殊处理 to是detail/xxx
    let to = usp.get("to");
    if (location.pathname === "/login" && /^\/detail\/\d+$/.test(to)) {
      navigate(to, { replace: true });
      return;
    }
    navigate(-1);
  };

  return (
    <NavBar className={styled.mynavbar} onBack={handleBack}>
      {title}
    </NavBar>
  );
});

// 默认值
NavBarAgain.defaultProps = {
  title: "个人中心",
};
export default NavBarAgain;
