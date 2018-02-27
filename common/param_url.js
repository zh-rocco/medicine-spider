function param(data) {
  let string = "";
  string = Object.keys(data)
    .map(key => `${key}=${data[key] !== undefined ? data[key] : ""}`)
    .join("&");
  return string;
}

function paramUrl(url, data) {
  return (url += `${url.indexOf("?") === -1 ? "?" : "&"}${param(data)}`);
}

module.exports = paramUrl;
