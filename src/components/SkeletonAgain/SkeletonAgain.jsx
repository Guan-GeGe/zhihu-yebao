import React, { memo } from "react";
import { Skeleton } from "antd-mobile";
import styled from "./SkeletonAgain.module.less";
const SkeletonAgain = memo(() => {
  return (
    <>
      <div className={styled.skeleton}>
        <Skeleton.Title animated></Skeleton.Title>
        <Skeleton.Paragraph lineCount={5} animated></Skeleton.Paragraph>
      </div>
    </>
  );
});

export default SkeletonAgain;
