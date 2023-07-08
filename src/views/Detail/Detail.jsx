import React from "react";
import {
  LeftOutline,
  StarOutline,
  FillinOutline,
  HeartOutline,
  UploadOutline,
} from "antd-mobile-icons";
import { Badge, Toast } from "antd-mobile";
import styled from "./detail.module.less";
import {
  queryNewsInfo,
  queryStoryExtra,
  storePost,
  storeRemove,
} from "@/service/home/home.js";
import { useEffect, useState, useMemo } from "react";
import SkeletonAgain from "@/components/SkeletonAgain/SkeletonAgain";
import { flushSync } from "react-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { feachInfoData } from "@/store/features/Info.js";
import { feachStoreData, clearStore } from "@/store/features/Store.js";
export default function Detail(props) {
  // 以为我们已经在路由中添加方法，所以能够直接在props中取出navigate
  let { navigate, params, location } = props;
  // console.log(props);
  let [info, setInfo] = useState();
  let [extra, setIxtra] = useState();
  const dispatch = useDispatch();
  const { Info, Store } = useSelector(
    (state) => ({
      Info: state.infoData.Info,
      Store: state.StoreData.Store,
    }),
    shallowEqual
  );
  // 处理样式
  let link;
  const handleStyle = (css) => {
    // console.log(css);
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = css;
    document.head.appendChild(link);
  };

  // 处理照片
  const handleImage = (image, title) => {
    // console.log(image);
    const imgPlaceHolder = document.querySelector(".img-place-holder");
    // 创建大图
    const tempImg = new Image();
    tempImg.src = image;
    tempImg.onload = () => {
      imgPlaceHolder.appendChild(tempImg);
    };
    tempImg.onerror = () => {
      let parent = imgPlaceHolder.parentNode;
      parent.parentNode.removeChild(tempImg);
    };
    // 创建图片上的文字
    const imgtitle = document.createElement("div");
    imgtitle.innerHTML = title;
    imgtitle.style = `
     position: absolute;
      bottom: 40px;
     padding:0 20px;
      font-size:20px;
      color:#fff
    `;
    imgPlaceHolder.appendChild(imgtitle);
  };
  // 首先查看是否有登录信息，如果没有就先获取一下，如果没有就登录

  // 点击收藏
  const StarClick = async () => {
    if (!Info) {
      navigate(
        {
          pathname: "/login",
          search: `?to=${location.pathname}`,
        },
        { replace: true }
      );
      return;
    }
    // if(isStore){
    if (isStore) {
      // 已经收藏了,取消当前收藏
      // 拿到收藏的id
      const id = Store.find((item) => item.news.id == params.id).id;
      console.log(id);
      const { data } = await storeRemove(id);
      if (data.codeText == "OK") {
        await dispatch(feachStoreData());
        Toast.show({
          icon: "success",
          content: "取消收藏成功",
        });
      }
    } else {
      const { data } = await storePost(params.id);
      if (data.codeText == "OK") {
        // 成功收藏之后重新获取列表
        await dispatch(feachStoreData());
        Toast.show({
          icon: "success",
          content: "收藏成功",
        });
      }
    }
  };
  useEffect(() => {
    (async () => {
      // console.log(!Info);
      let userInfo;
      if (!Info) {
        // console.log(1);
        const { payload } = await dispatch(feachInfoData());
        userInfo = payload;
      }
      console.log(Store, userInfo, Info);
      // 如果有用户信息，并且在store中没有收藏信息，我们需要重新获取收藏信息
      if ((Info || userInfo) && !Store) {
        // console.log(2);

        await dispatch(feachStoreData());
      }
    })();
  }, []);
  // 获取新闻详细信息，我们需要详细信息和点赞信息同时获取，所以需要使用两次useEffect
  useEffect(() => {
    (async () => {
      console.log("222");

      const { data } = await queryNewsInfo(params.id);
      flushSync(() => {
        setInfo(data);
        handleStyle(data?.css?.[0] ?? []);
      });

      handleImage(data?.images?.[0] ?? [], data?.title);
    })();
    // 销毁样式
    return () => {
      if (link) document.head.removeChild(link);
    };
  }, []);
  useEffect(() => {
    (async () => {
      console.log("333");

      const { data } = await queryStoryExtra(params.id);
      setIxtra(data);
    })();
  }, []);
  // 使用收藏列表和路由参数，计算出是否收藏
  let isStore = useMemo(() => {
    if (!Store) return false;
    return Store.some((item) => {
      console.log(item.news.id, params.id);
      return item.news.id == params.id;
    });
  }, [Store, params]);

  return (
    <>
      {info ? (
        <div
          className={styled.content}
          dangerouslySetInnerHTML={{ __html: info.body }}
        ></div>
      ) : (
        <SkeletonAgain />
      )}
      <div className={styled.footer}>
        <div
          className={styled.back}
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftOutline fontSize={24} color="#000" />
        </div>
        <div className={styled.other}>
          <Badge content={extra?.comments ?? 0}>
            <FillinOutline fontSize={24} />
          </Badge>
          <Badge content={extra?.popularity ?? 0}>
            <HeartOutline fontSize={24} />
          </Badge>

          <StarOutline
            fontSize={24}
            onClick={StarClick}
            style={{ color: isStore ? "blue" : "black" }}
          />
          <UploadOutline fontSize={24} />
        </div>
      </div>
    </>
  );
}
