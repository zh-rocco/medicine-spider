/* 获取问答 */

const puppeteer = require("puppeteer");
const sequelize = require("../../models/db_connect");
const queryQAModel = require("../../db_operate/qa/query");
const createQAModel = require("../../db_operate/qa/create");
const customConsole = require("../../common/console");
const paramUrl = require("../../common/param_url");
const getDomData = require("../get_dom_data");
const gbkEncode = require("../../common/gbk");
const shaveData = require("./dom");

const TARGET_URL = "http://www.cfdi.org.cn/cfdi/index?module=A004&m1=10&m2=&nty=STA024&tcode=STA026";
const WAIT_TIME = 2000; // puppeteer 首次加载页面等待时长
const NAVIGATION_TIMEOUT = 20000; // puppeteer 页面无响应等待时间
const START_NUM = 56; // 问答起始页面
const END_NUM = 456; // 问答结束页面, 目前最大有效页数为 456

let puppeteer_page = null; // puppeteer page 实例
let custom_console = null; // draftlog 实例

async function writeData(page_num, data_list) {
  for (let i = 0, len = data_list.length; i < len; i++) {
    const data = data_list[i];
    const qa = await queryQAModel(data.cid); // 查询数据库中是否存在该数据
    if (qa === null) await createQAModel(data);
  }
  custom_console.update({ id: `P:${page_num}`, status: 1, text: `${JSON.stringify(data_list.map(item => item.cid))}` });
  return Promise.resolve();
}

async function getData(page_num) {
  await puppeteer_page.goto(TARGET_URL);
  await puppeteer_page.type(".gotopage", page_num);
  await puppeteer_page.click(".pagination a[style]");
  await puppeteer_page.waitFor(WAIT_TIME);
  const result = await puppeteer_page.evaluate(shaveData);
  custom_console.update({ id: `P:${page_num}`, text: `${JSON.stringify(result.map(item => item.cid))}` });
  if (result.length === 0) throw new Error("result 为 []");
  await puppeteer_page.waitFor(300);
  await writeData(page_num, result);
  return Promise.resolve();
}

async function getQAs() {
  const browser = await puppeteer.launch({ headless: true, devtools: false });
  puppeteer_page = await browser.newPage();
  puppeteer_page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  for (let i = START_NUM; i <= END_NUM; i++) {
    i += "";
    custom_console = new customConsole({ id: `P:${i}`, text: '获取"问题与回复"...' });
    try {
      await getData(i);
    } catch (err) {
      await getData(i);
    }
  }

  await puppeteer_page.close();
  await browser.close();
  await sequelize.close(); // 断开数据库连接

  return Promise.resolve();
}

module.exports = getQAs;
