const Joi = require("joi");
const text = Joi.string().trim()

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
  state: text,
  city: text,
  address: text,
  type: text,
});

const reportSchema = Joi.object({
  reason: text.required(),
  description: text.required(),
});

module.exports = { StatusSchema, updateSchema, reportSchema};
