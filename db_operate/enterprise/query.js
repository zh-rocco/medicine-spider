const EnterpriseModel = require("../../models/enterprise_model");

const queryEnterprise = ent_id => {
  return EnterpriseModel.findOne({
    where: { ent_id },
    attributes: ["ent_id", "ent_name"]
  });
};

module.exports = queryEnterprise;
