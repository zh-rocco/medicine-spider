function shaveData() {
  function getIdFromUrlString(str) {
    const regex = /&id=(\d+)/i;
    const result = regex.exec(str);
    return result ? result[1] : "";
  }

  const $table = document.querySelector("table[align=center]");

  // 没有相关信息
  const $span = $table.querySelector("span");
  if ($span && $span.textContent === "没有相关信息") return "没有相关信息";

  const firstText = $table.querySelector("td").textContent;

  if (firstText.indexOf("符合条件的记录") === -1) {
    const $trs = $table.querySelectorAll("tr");
    let trArray = Array.from($trs);
    trArray.shift(); // 去掉头部无用的数据

    let dataArray = trArray.map(tr => {
      const $td = tr.querySelectorAll("td")[1];
      return $td.textContent || "";
    });

    return { isList: false, data: dataArray };
  } else {
    const $tds = $table.querySelectorAll("td");
    let trArray = Array.from($tds);
    let trArray2 = trArray.filter($td => $td.textContent !== "");
    trArray2.shift(); // 去掉头部无用的数据
    let dataArray = trArray2.map($td => {
      const href = $td.querySelector("a").getAttribute("href");
      return getIdFromUrlString(href);
    });

    return { isList: true, data: dataArray };
  }
}

module.exports = shaveData;
