const GMPModel = require("../../models/gmp_model");

const queryGMPModel = gmp_id => {
  return GMPModel.findOne({
    where: { gmp_id },
    attributes: ["ent_id"]
  });
};

module.exports = queryGMPModel;
