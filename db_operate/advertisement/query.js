const AdvertisementModel = require("../../models/advertisement_model");

const queryAdvertisement = ad_id => {
  return AdvertisementModel.findOne({
    where: { ad_id },
    attributes: ["ent_id"]
  });
};

module.exports = queryAdvertisement;
