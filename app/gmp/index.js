/* 获取 GMP 信息 */

const puppeteer = require("puppeteer");
const sequelize = require("../../models/db_connect");
const queryEnterprise = require("../../db_operate/enterprise/query");
const queryGMPModel = require("../../db_operate/gmp/query");
const createGMPModel = require("../../db_operate/gmp/create");
const customConsole = require("../../common/console");
const paramUrl = require("../../common/param_url");
const getDomData = require("../get_dom_data");
const gbkEncode = require("../../common/gbk");
const config = require("../../config/index");
const shaveData = require("./dom");

const { WAIT_TIME, NAVIGATION_TIMEOUT, START_ID, END_ID, TARGET_URL } = config;
let puppeteer_page = null; // puppeteer page 实例
let custom_console = null; // draftlog 实例
let enterprise_id = ""; // 药企 ID
let retry_count = 0; // 获取数据失败时重试的次数
let success_count = 0; // 单个药企的国产药品存储成功次数

async function writeData(gmp_id, data_array) {
  data_array.splice(0, 0, enterprise_id, gmp_id);
  data_array.splice(-2, 2); // 去掉尾部无用的数据
  const gmp = await queryGMPModel(gmp_id); // 查询数据库中是否存在该数据
  if (gmp === null) await createGMPModel(data_array);
  success_count++;
  return Promise.resolve();
}

async function getGMPOfEnterprise(gmp_id) {
  // 示例: http://app1.sfda.gov.cn/datasearch/face3/content.jsp?tableId=39&tableName=TABLE39&Id=85464
  const url = paramUrl(TARGET_URL, {
    tableId: "23",
    tableName: "TABLE23",
    Id: gmp_id
  });

  await puppeteer_page.goto(url);
  const result = await puppeteer_page.evaluate(getDomData);

  if (typeof result === "object") {
    await writeData(gmp_id, result);
  } else {
    custom_console.update({ id: enterprise_id, status: 0, text: `获取GMP(${gmp_id})信息失败: ${result}` });
  }

  return Promise.resolve();
}

async function getGMPsOfEnterprise(id_list) {
  for (let i = 0, len = id_list.length; i < len; i++) {
    retry_count = 0;
    const gmp_id = id_list[i];

    try {
      custom_console.update({ id: enterprise_id, text: `获取GMP(${gmp_id})信息...` });
      await getGMPOfEnterprise(gmp_id);
    } catch (err) {
      retry_count++;
      custom_console.update({ id: enterprise_id, text: `获取GMP(${gmp_id})信息: 第 ${retry_count} 次重试` });
      await getGMPOfEnterprise(gmp_id);
    }
  }

  custom_console.update({ id: enterprise_id, status: 1, text: `完成GMP获取(${success_count}/${id_list.length})` });
  return Promise.resolve();
}

async function getGMPListOfEnterprise(enterprise_name) {
  // 示例: http://app1.sfda.gov.cn/datasearch/face3/content.jsp?tableId=39&tableName=TABLE39&linkId=COLUMN410&linkValue=%D1%EF%D7%D3%BD%AD%D2%A9%D2%B5%BC%AF%CD%C5%C9%CF%BA%A3%BA%A3%C4%E1%D2%A9%D2%B5%D3%D0%CF%DE%B9%AB%CB%BE
  const url = paramUrl(TARGET_URL, {
    tableId: "23",
    tableName: "TABLE23",
    linkId: "COLUMN152",
    linkValue: gbkEncode(enterprise_name)
  });

  await puppeteer_page.goto(url);
  const result = await puppeteer_page.evaluate(shaveData);

  if (typeof result === "object") {
    if (result.isList) {
      await getGMPsOfEnterprise(result.data);
    } else {
      await writeData(`null-${enterprise_id}`, result.data);
      custom_console.update({ id: enterprise_id, status: 1, text: `完成GMP获取(1/1)` });
    }
  } else {
    custom_console.update({ id: enterprise_id, status: 0, text: `获取GMP列表失败: ${result}` });
  }

  return Promise.resolve();
}

async function getGMPs() {
  const browser = await puppeteer.launch({ headless: true, devtools: false });
  puppeteer_page = await browser.newPage();
  puppeteer_page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);
  await puppeteer_page.waitFor(WAIT_TIME);

  for (let i = START_ID; i <= END_ID; i++) {
    enterprise_id = i + "";
    retry_count = 0;
    success_count = 0;

    custom_console = new customConsole({ id: enterprise_id, text: "获取GMP列表..." });

    const enterprise = await queryEnterprise(i); // 查询数据库中是否存在该数据
    if (enterprise) {
      try {
        await getGMPListOfEnterprise(enterprise.ent_name);
      } catch (err) {
        retry_count++;
        custom_console.update({ id: enterprise_id, text: `获取GMP列表: 第 ${retry_count} 次重试` });
        await getGMPListOfEnterprise(enterprise.ent_name);
      }
    } else {
      custom_console.update({ id: enterprise_id, status: 0, text: `药企不存在` });
      continue;
    }
  }

  await puppeteer_page.close();
  await browser.close();
  await sequelize.close(); // 断开数据库连接

  return Promise.resolve();
}

module.exports = getGMPs;
