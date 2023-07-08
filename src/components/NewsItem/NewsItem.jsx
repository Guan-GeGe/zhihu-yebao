import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "./NewsItem.module.less";
import { Image } from "antd-mobile";
const NewsItem = memo((props) => {
  let { item } = props;
  if (!item) return null;
  return (
    <>
      <Link to={{ pathname: `/detail/${item.id}` }}>
        <div className={styled.newsItem}>
          <div className={styled.content}>
            <h2>{item.title}</h2>
            <div className={styled.msg}>{item.hint}</div>
          </div>
          <div className={styled.image}>
            {/* <img src={item.images[0]} alt="" /> */}
            <Image src={item?.images?.[0] ?? item.image} lazy></Image>
          </div>
        </div>
      </Link>
    </>
  );
});

export default NewsItem;
