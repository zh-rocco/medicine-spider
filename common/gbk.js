var iconv = require("iconv-lite");

function gbkEncode(str) {
  const buffer = iconv.encode(str, "GBK");
  const data = Array.from(buffer).map(item => item.toString(16).toUpperCase());
  data.unshift("");
  return data.join("%");
}

module.exports = gbkEncode;
