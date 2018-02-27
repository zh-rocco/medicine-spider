const GMPModel = require("../../models/gmp_model");

const createGMPModel = array => {
  let data = {
    ent_id: array[0],
    gmp_id: array[1],
    region: array[2],
    gmp_num: array[3],
    ent_name: array[4],
    address: array[5],
    appr_range: array[6],
    sign_time: array[7],
    expire_time: array[8],
    appr_ext_time: array[9],
    exp_ext_time: array[10],
    appr_ext_range: array[11],
    gmp_class: array[12],
    remarks: array[13]
  };

  return GMPModel.create(data);
};

module.exports = createGMPModel;
