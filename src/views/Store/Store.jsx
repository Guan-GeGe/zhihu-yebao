import React, { memo, useEffect, useState } from "react";
import NavBarAgain from "@/components/NavBarAgain/NavBarAgain";
import NewsItem from "@/components/NewsItem/NewsItem";
import { queryStoreList } from "@/service/home/home.js";

const Store = memo(() => {
  const [storeList, setStoreList] = useState([]);
  useEffect(() => {
    (async () => {
      let { data } = await queryStoreList();
      console.log(data);
      setStoreList(data.data);
    })();
  }, []);
  return (
    <>
      <div>
        <NavBarAgain title="我的收藏" />
        {storeList.map((items) => {
          return <NewsItem key={items.id} item={items.news} />;
        })}
        {/* <NewsItem item={storeList} /> */}
      </div>
    </>
  );
});

export default Store;
