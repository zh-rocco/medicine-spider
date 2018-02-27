const QAModel = require("../../models/qa_model");

const createQAModel = ({ cid, title, date, question, reply }) => {
  let data = { cid, title, date, question, reply };

  return QAModel.create(data);
};

module.exports = createQAModel;
