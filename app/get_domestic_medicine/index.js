/* 获取国产药品信息 */

const puppeteer = require("puppeteer");
const sequelize = require("../../models/db_connect");
const queryEnterprise = require("../../db_operate/enterprise/query");
const queryDomesticMedicine = require("../../db_operate/domestic_medicine/query");
const createDomesticMedicine = require("../../db_operate/domestic_medicine/create");
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

async function writeData(med_id, data_array) {
  data_array.splice(0, 0, enterprise_id, med_id);
  data_array.splice(-3, 3); // 去掉尾部无用的数据
  const advertisement = await queryDomesticMedicine(med_id); // 查询数据库中是否存在该数据
  if (advertisement === null) await createDomesticMedicine(data_array);
  success_count++;
  return Promise.resolve();
}

async function getDMOfEnterprise(med_id) {
  // 示例: http://app1.sfda.gov.cn/datasearch/face3/content.jsp?tableId=39&tableName=TABLE39&Id=85464
  const url = paramUrl(TARGET_URL, {
    tableId: "25",
    tableName: "TABLE25",
    Id: med_id
  });

  await puppeteer_page.goto(url);
  const result = await puppeteer_page.evaluate(getDomData);

  if (typeof result === "object") {
    await writeData(med_id, result);
  } else {
    custom_console.update({ id: enterprise_id, status: 0, text: `获取国产药品(${med_id})信息失败: ${result}` });
  }

  return Promise.resolve();
}

async function getDMsOfEnterprise(id_list) {
  for (let i = 0, len = id_list.length; i < len; i++) {
    retry_count = 0;
    const med_id = id_list[i];

    try {
      custom_console.update({ id: enterprise_id, text: `获取国产药品(${med_id})信息(${i}/${len})...` });
      await getDMOfEnterprise(med_id);
    } catch (err) {
      retry_count++;
      custom_console.update({ id: enterprise_id, text: `获取国产药品(${med_id})信息: 第 ${retry_count} 次重试` });
      await getDMOfEnterprise(med_id);
    }
  }

  custom_console.update({ id: enterprise_id, status: 1, text: `完成国产药品获取(${success_count}/${id_list.length})` });
  return Promise.resolve();
}

async function getDMListOfEnterprise(enterprise_name) {
  // 示例: http://app1.sfda.gov.cn/datasearch/face3/content.jsp?tableId=39&tableName=TABLE39&linkId=COLUMN410&linkValue=%D1%EF%D7%D3%BD%AD%D2%A9%D2%B5%BC%AF%CD%C5%C9%CF%BA%A3%BA%A3%C4%E1%D2%A9%D2%B5%D3%D0%CF%DE%B9%AB%CB%BE
  const url = paramUrl(TARGET_URL, {
    tableId: "25",
    tableName: "TABLE25",
    linkId: "COLUMN170",
    linkValue: gbkEncode(enterprise_name)
  });

  await puppeteer_page.goto(url);
  const result = await puppeteer_page.evaluate(shaveData);

  if (typeof result === "object") {
    if (result.isList) {
      await getDMsOfEnterprise(result.data);
    } else {
      await writeData(`null-${enterprise_id}`, result.data);
      custom_console.update({ id: enterprise_id, status: 1, text: `完成国产药品获取(1/1)` });
    }
  } else {
    custom_console.update({ id: enterprise_id, status: 0, text: `获取国产药品列表失败: ${result}` });
  }

  return Promise.resolve();
}

async function getDomesticMedicines() {
  const browser = await puppeteer.launch({ headless: true, devtools: false });
  puppeteer_page = await browser.newPage();
  puppeteer_page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);
  await puppeteer_page.waitFor(WAIT_TIME);

  for (let i = START_ID; i <= END_ID; i++) {
    enterprise_id = i + "";
    retry_count = 0;
    success_count = 0;

    custom_console = new customConsole({ id: enterprise_id, text: "获取国产药品列表..." });

    const enterprise = await queryEnterprise(i); // 查询数据库中是否存在该数据
    if (enterprise) {
      try {
        await getDMListOfEnterprise(enterprise.ent_name);
      } catch (err) {
        retry_count++;
        custom_console.update({ id: enterprise_id, text: `获取国产药品列表: 第 ${retry_count} 次重试` });
        await getDMListOfEnterprise(enterprise.ent_name);
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

module.exports = getDomesticMedicines;
