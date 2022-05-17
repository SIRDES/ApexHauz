const Joi = require("joi");
const text = Joi.string().trim()
const requiredText = text.required()
const statusSchema = Joi.object({
  status: Joi.string()
    .custom((value, helper) => {
      if (value !== "available" && value !== "sold") {
        return helper.message("status should be sold or available");
      }
      return true;
    })
    .required(),
});

const updateSchema = Joi.object({
  price: Joi.number(),
  state: text,
  city: text,
  address: text,
  type: text,
});
const newPropertySchema = Joi.object({
  price: Joi.number().required(),
  state: requiredText,
  city: requiredText,
  address: requiredText,
  type: requiredText,
  status: Joi.string().custom((value, helper) => {
    if (value !== "available" && value !== "sold") {
      return helper.message("status should be sold or available");
    }
    return value;
  }),
});

const reportSchema = Joi.object({
  reason: requiredText,
  description: requiredText,
});
// status, price, state, city, address, type;
module.exports = {
  statusSchema,
  updateSchema,
  reportSchema,
  newPropertySchema
};
