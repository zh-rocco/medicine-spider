function shaveData() {
  const $table = document.querySelector("table[align=center]");
  const $trs = $table.querySelectorAll("tr");

  if (!$trs.length || $trs.length < 20) {
    const $span = document.querySelector("table[align=center] span");
    return $span ? $span.textContent : "未知错误";
  }

  let trArray = Array.from($trs);
  trArray.shift(); // 去掉头部无用的数据
  trArray.splice(-5, 5); // 去掉尾部无用的数据

  let dataArray = trArray.map(tr => {
    const $td = tr.querySelectorAll("td")[1];
    return $td ? $td.textContent : "";
  });

  return dataArray;
}

module.exports = shaveData;
