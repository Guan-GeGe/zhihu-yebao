import WHRequest from "..";
// 获取今日信息 轮播图信息
export const queryNewsLatest = () => {
  return WHRequest.get({
    url: "/news_latest",
  });
};

// 获取往日新闻信息
export const queryNewsBefore = (time) => {
  return WHRequest.get({
    url: "/news_before",
    params: {
      time,
    },
  });
};

// 获取新闻详细信息
export const queryNewsInfo = (id) => {
  return WHRequest.get({
    url: "/news_info",
    params: {
      id,
    },
  });
};

// 获取新闻点赞信息
export const queryStoryExtra = (id) => {
  return WHRequest.get({
    url: "/story_extra",
    params: {
      id,
    },
  });
};

// 获取短信验证码
export const querySmsCode = (phone) => {
  return WHRequest.post({
    url: "/phone_code",
    data: {
      phone,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
// 登录/注册
export const queryLogin = (phone, code) => {
  return WHRequest.post({
    url: "/login",
    data: {
      phone,
      code,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
// 获取登陆信息
export const queryUserInfo = () => {
  return WHRequest.get({
    url: "/user_info",
  });
};
// 获取收藏信息
export const queryStoreList = () => {
  return WHRequest.get({
    url: "/store_list",
  });
};
// 收藏新闻
export const storePost = (newsId) => {
  return WHRequest.post({
    url: "/store",
    data: { newsId },
  });
};

// 取消收藏
export const storeRemove = (id) => {
  return WHRequest.get({
    url: "/store_remove",
    params: { id },
  });
};
