module.exports = {
  TARGET_URL: "http://app1.sfda.gov.cn/datasearch/face3/content.jsp",
  WAIT_TIME: 1000, // puppeteer 首次加载页面等待时长
  NAVIGATION_TIMEOUT: 10000, // puppeteer 页面无响应等待时间
  START_ID: 1, // 药企起始 id
  END_ID: 7510 // 药企结束 id, 目前最大有效 id 为 7508
};
