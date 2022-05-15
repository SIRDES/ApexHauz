const Joi = require("joi");

const StatusSchema = Joi.object({
  status: Joi.string().custom((value, helper)=> {
    if(value !== "available" && value !== "sold"){
      return helper.message("status should be sold or available")
    }
    return true
  }).required()
  // msisdn: Joi.number().required(),
  // amount: Joi.number().required(),
  // network: Joi.string().trim().required(),
  // narration: Joi.string().trim().required(),
});

module.exports = StatusSchema;
