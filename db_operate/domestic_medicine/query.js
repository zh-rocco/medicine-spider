const DomesticMedicineModel = require("../../models/domestic_medicine_model");

const queryDomesticMedicine = med_id => {
  return DomesticMedicineModel.findOne({
    where: { med_id },
    attributes: ["ent_id"]
  });
};

module.exports = queryDomesticMedicine;
