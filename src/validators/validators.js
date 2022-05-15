const Joi = require("joi");

const StatusSchema = Joi.object({
  status: Joi.string()
    .custom((value, helper) => {
      if (value !== "available" && value !== "sold") {
        return helper.message("status should be sold or available");
      }
      return true;
    })
    .required(),
  // msisdn: Joi.number().required(),
  // amount: Joi.number().required(),
  // network: Joi.string().trim().required(),
  // narration: Joi.string().trim().required(),
});

const updateSchema = Joi.object({
  price: Joi.number(),
  state: Joi.string().trim(),
  city: Joi.string().trim(),
  address: Joi.string().trim(),
  type: Joi.string().trim(),
});

module.exports = { StatusSchema, updateSchema };
