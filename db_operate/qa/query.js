const QAModel = require("../../models/qa_model");

const queryQAModel = cid => {
  return QAModel.findOne({
    where: { cid },
    attributes: ["title"]
  });
};

module.exports = queryQAModel;
