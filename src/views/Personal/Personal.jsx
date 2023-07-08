import React, { memo } from "react";
import NavBarAgain from "@/components/NavBarAgain/NavBarAgain";
import { Image, Toast } from "antd-mobile";
import time from "@/assets/images/timg.jpg";
import { Link } from "react-router-dom";
import styled from "./Personal.module.less";
import { RightOutline } from "antd-mobile-icons";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { clearInfo } from "@/store/features/Info.js";
import { clearStore } from "@/store/features/Store.js";
import { storage } from "@/assets/utils.js";
const Personal = memo((props) => {
  const { navigate } = props;
  const dispatch = useDispatch();
  const { Info } = useSelector(
    (state) => ({
      Info: state.infoData.Info,
    }),
    shallowEqual
  );
  const signout = async () => {
    await dispatch(clearInfo());
    await dispatch(clearStore());
    storage.remove("tk");
    Toast.show({
      icon: "success",
      content: "您已安全退出",
    });
    navigate("/login?to=/personal", { replace: true });
  };

  return (
    <>
      <div className={styled.personal}>
        <NavBarAgain title="" />
        <div className={styled.avatar}>
          <Image src={Info ? Info.pic : time} />
        </div>
        <h2 className={styled.name}>{Info ? Info.name : "这不是呢称"}</h2>
        <div className={styled.tabs}>
          <Link className={styled.store} to="/store">
            我的收藏
            <RightOutline />
          </Link>
          <div className={styled.tab} onClick={signout}>
            退出登录
            <RightOutline />
          </div>
        </div>
      </div>
    </>
  );
});

export default Personal;
