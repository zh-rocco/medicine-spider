const AdvertisementModel = require("../../models/advertisement_model");

const createAdvertisement = array => {
  let data = {
    ent_id: array[0],
    ad_id: array[1],
    ad_app_num: array[2],
    ent_name: array[3],
    address: array[4],
    zipcode: array[5],
    comm_name: array[6],
    prod_name: array[7],
    brand_name: array[8],
    prescription: array[9],
    ad_type: array[10],
    ad_time: array[11],
    expire_time: array[12],
    ad_content: array[13],
    app_num: array[14],
    remarks: array[15]
  };

  return AdvertisementModel.create(data);
};

module.exports = createAdvertisement;
