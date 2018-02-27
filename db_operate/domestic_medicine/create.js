const DomesticMedicineModel = require("../../models/domestic_medicine_model");

const createDomesticMedicine = array => {
  let data = {
    ent_id: array[0],
    med_id: array[1],
    appr_num: array[2],
    prod_name: array[3],
    en_name: array[4],
    comm_name: array[5],
    dosage_form: array[6],
    specification: array[7],
    ent_name: array[8],
    ent_addr: array[9],
    prod_class: array[10],
    appr_time: array[11],
    appr_num_o: array[12],
    std_code: array[13],
    std_code_d: array[14]
  };

  return DomesticMedicineModel.create(data);
};

module.exports = createDomesticMedicine;
