import React, { memo, useEffect } from "react";
import time from "@/assets/images/timg.jpg";
import styled from "./HomeHead.module.less";
import { Divider } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { feachInfoData } from "@/store/features/Info.js";
import dayjs from "dayjs";
const HomeHead = memo((props) => {
  let { today } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(Info);
    if (!Info) {
      dispatch(feachInfoData());
    }
  }, [dispatch]);
  const { Info } = useSelector(
    (state) => ({
      Info: state.infoData.Info,
    }),
    shallowEqual
  );
  const avatarClick = () => {
    console.log("123123");
    navigate("/personal");
  };
  let mountArr = [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二",
  ];
  let mount = Number(dayjs(today).format("MM")) - 1;
  return (
    <header className={styled.headBox}>
      <div className={styled.info}>
        <div className={styled.time}>
          <span>{dayjs(today).format("DD")}</span>
          <span>{mountArr[mount]}月</span>
        </div>
        <Divider direction="vertical" />
        <h2 className="title">知乎夜报</h2>
      </div>

      <div className={styled.picture} onClick={avatarClick}>
        <img src={Info ? Info.pic : time} alt="" />
      </div>
    </header>
  );
});

export default HomeHead;
