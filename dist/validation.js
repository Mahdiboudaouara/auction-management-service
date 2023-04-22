"use strict";

const Joi = require("@hapi/joi");
const db = require("./config");
//register validation
const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    balance: Joi.number()
  });
  return schema.validate(data);
};
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};
module.exports = {
  registerValidation,
  loginValidation
};