function shaveData() {
  function getIdFromUrlString(str) {
    const regex = /&id=(\d+)/i;
    const result = regex.exec(str);
    return result ? result[1] : "";
  }

  let result = [];
  const $list = document.querySelectorAll(".page-rep-list");
  const aList = Array.from($list);

  aList.forEach($item => {
    const $a = $item.querySelector(".que-info a");
    const $queTitle = $item.querySelectorAll(".que-title");
    const oItem = {
      cid: getIdFromUrlString($a.getAttribute("href")),
      title: $a.textContent,
      date: $item.querySelectorAll(".que-info span")[1].textContent,
      question: $queTitle[0].textContent.substr(5),
      reply: $queTitle[1].textContent.substr(3)
    };
    result.push(oItem);
  });

  return result;
}

module.exports = shaveData;
