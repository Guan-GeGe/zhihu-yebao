import React, { memo, useState, useEffect } from "react";
import HomeHeader from "@/components/HomeHeade/HomeHead";
import dayjs from "dayjs";
import { Swiper, Image, Divider, InfiniteScroll, List } from "antd-mobile";
import { Link } from "react-router-dom";
import styled from "./Home.module.less";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { feachHomeData } from "@/store/features/Home.js";
import NewsItem from "@/components/NewsItem/NewsItem";
import SkeletonAgain from "@/components/SkeletonAgain/SkeletonAgain";
import { queryNewsLatest, queryNewsBefore } from "@/service/home/home.js";
const Home = memo(() => {
  let [today, styToday] = useState(dayjs().format("YYYYMMDD"));
  const [hasMore, setHasMore] = useState(true);
  // 存放轮播图的数据
  let [bannerData, setBannerData] = useState([]);
  // 新闻列表数据
  let [newsList, setNewsList] = useState([]);
  // 第一次渲染完毕后，请求数据，然后更新bannerData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await queryNewsLatest();
        let { date, top_stories, stories } = data;
        console.log(data);
        styToday(date);
        setBannerData(top_stories);
        newsList.push({ date, stories });
        setNewsList([...newsList]);

        console.log(newsList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  // 使用useDispatch用来请求redux中的方法，用来请求数据
  console.log("111");
  // const dispath = useDispatch();
  // useEffect(() => {
  //   dispath(feachHomeData());
  // }, [dispath]);
  // // 获取数据
  // const { NewsLatst } = useSelector(
  //   (state) => ({
  //     NewsLatst: state.home.NewsLatst,
  //   }),
  //   shallowEqual
  // );
  // useEffect(() => {
  //   let { date, top_stories, stories } = NewsLatst;
  //   setBannerData(top_stories);
  //   styToday(date);

  //   newsList.push({ date, stories });
  //   setNewsList([...newsList]);
  //   console.log(newsList);
  // }, [NewsLatst]);
  async function loadMore() {
    if (!newsList[newsList.length - 1]?.["date"]) return;
    // 当传入当前日期会返回前一天的数据，所以传当天数据
    let time = newsList[newsList.length - 1]?.["date"];
    let { data } = await queryNewsBefore(time);
    setNewsList((val) => [...val, data]);
    setHasMore(data.stories.length > 0);
  }
  return (
    <>
      <HomeHeader today={today} />
      {/* 轮播图 */}
      <div className={styled.swiperBox}>
        <Swiper
          autoplay={true}
          loop={true}
          className={styled.swiperadm}
          indicatorProps={{
            color: "white",
          }}
        >
          {bannerData?.length > 0 &&
            bannerData?.map((item) => {
              return (
                <Swiper.Item key={item.id}>
                  <Link to={{ pathname: `/detail/${item.id}` }}>
                    {/* <img src={item.image} alt="" /> */}
                    <Image lazy src={item.image} />
                    <div className={styled.desc}>
                      <h3 className={styled.title}>{item.title}</h3>
                      <p className={styled.author}>{item.hint}</p>
                    </div>
                  </Link>
                </Swiper.Item>
              );
            })}
        </Swiper>
      </div>
      {/* 新闻列表 */}
      {/* 骨架 */}
      <div className={styled.newsItem}>
        {newsList.length > 0 ? (
          <List>
            {newsList.map((item) => {
              let { date, stories } = item;
              const newsDate = dayjs(date).format("MM月DD日");
              const nowDate = dayjs(date).format("YYYYMMDD");
              return (
                <List.Item key={date} className={styled.listItem}>
                  <div className="newsList" key={date}>
                    {today == nowDate ? null : (
                      <Divider contentPosition="left">{newsDate}</Divider>
                    )}
                    {stories.map((newsItem) => {
                      return <NewsItem key={newsItem.id} item={newsItem} />;
                    })}
                  </div>
                </List.Item>
              );
            })}
          </List>
        ) : (
          <SkeletonAgain />
        )}
        <InfiniteScroll threshold={1} loadMore={loadMore} hasMore={hasMore} />
      </div>
    </>
  );
});
export default Home;
