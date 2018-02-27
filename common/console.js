const chalk = require("chalk");
const DraftLog = require("draftlog").into(console);

function unifyStringLength(str, length = 8) {
  if (typeof str !== "string") str = str.toString();
  return " ".repeat(length - str.length);
}

function getConsoleText({ id, status = -1, text }) {
  let _text = chalk.cyan(" > ") + chalk.white(id) + unifyStringLength(id);

  switch (status) {
    case -1:
      return _text + chalk.blue(text);
    case 0:
      return _text + chalk.red(text);
    case 1:
      return _text + chalk.green(text);
    default:
      break;
  }
}

class customConsole {
  constructor({
    id, // 药企 id
    status, // 数据的状态
    text // 数据状态的描述
  }) {
    this._console = console.draft(getConsoleText({ id, status, text }));
  }

  update({ id, status = -1, text }) {
    this._console(getConsoleText({ id, status, text }));
  }
}

module.exports = customConsole;
