const EnterpriseModel = require("../../models/enterprise_model");

const createEnterprise = array => {
  let data = {
    ent_id: array[0],
    ent_num: array[1],
    org_code: array[2],
    cat_code: array[3],
    region: array[4],
    ent_name: array[5],
    leg_person: array[6],
    res_person: array[7],
    qa_person: array[8],
    reg_addr: array[9],
    prod_addr: array[10],
    prod_range: array[11],
    lic_time: array[12],
    expire_time: array[13],
    sign_office: array[14],
    sign_person: array[15],
    regulator: array[16],
    supervisors: array[17]
  };

  return EnterpriseModel.create(data);
};

module.exports = createEnterprise;
