function getDomData() {
  const $table = document.querySelector("table[align=center]");

  // 没有相关信息
  const $span = $table.querySelector("span");
  // if ($span) return $span.textContent;
  if ($span && $span.textContent === "没有相关信息") return "没有相关信息";

  const $trs = $table.querySelectorAll("tr");

  let trArray = Array.from($trs);
  trArray.shift(); // 去掉头部无用的数据

  let dataArray = trArray.map(tr => {
    const $td = tr.querySelectorAll("td")[1];
    return $td.textContent || "";
  });

  return dataArray;
}

module.exports = getDomData;
