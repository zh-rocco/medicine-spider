/* 获取药企信息 */

const puppeteer = require("puppeteer");
const sequelize = require("../../models/db_connect");
const queryEnterprise = require("../../db_operate/enterprise/query");
const createEnterprise = require("../../db_operate/enterprise/create");
const customConsole = require("../../common/console");
const paramUrl = require("../../common/param_url");
const config = require("../../config/index");
const shaveData = require("./dom");

const { WAIT_TIME, NAVIGATION_TIMEOUT, START_ID, END_ID, TARGET_URL } = config;
let puppeteer_page = null; // puppeteer page 实例
let custom_console = null; // draftlog 实例
let retry_count = 0; // 获取数据失败时重试的次数

async function getEnterprise(id) {
  // 示例: http://app1.sfda.gov.cn/datasearch/face3/content.jsp?tableId=34&tableName=TABLE34&Id=5478
  const url = paramUrl(TARGET_URL, {
    tableId: "34",
    tableName: "TABLE34",
    Id: id
  });

  await puppeteer_page.goto(url);
  const result = await puppeteer_page.evaluate(shaveData);

  if (Object.prototype.toString.call(result) === "[object Array]") {
    result.unshift(id);
    const enterprise = await queryEnterprise(id); // 查询数据库中是否存在该数据
    if (enterprise === null) {
      await createEnterprise(result);
      custom_console.update({ id, status: 1, text: `${result[5]} [数据已写入]` });
    } else {
      custom_console.update({ id, status: 1, text: `${result[5]} [数据已存在]` });
    }
  } else {
    custom_console.update({ id, status: 0, text: `获取药厂信息失败: ${result}` });
  }

  return Promise.resolve();
}

async function getEnterprises() {
  const browser = await puppeteer.launch({ headless: true, devtools: false });
  puppeteer_page = await browser.newPage();
  puppeteer_page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);
  await puppeteer_page.waitFor(WAIT_TIME);

  for (let i = START_ID; i <= END_ID; i++) {
    retry_count = 0;
    custom_console = new customConsole({ id: i, text: "获取药厂信息..." });
    i += ""; // 数字转字符串

    try {
      await getEnterprise(i);
    } catch (err) {
      retry_count++;
      custom_console.update({ id: i, text: `获取药厂信息: 第 ${retry_count} 次重试` });
      await getEnterprise(i);
    }
  }

  await puppeteer_page.close();
  await browser.close();
  await sequelize.close(); // 断开数据库连接

  return Promise.resolve();
}

module.exports = getEnterprises;
