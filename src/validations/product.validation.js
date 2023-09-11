const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    productType: Joi.string().required(),
    imageUrl: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      productType: Joi.string().required(),
      imageUrl: Joi.string().required(),
    })
    .min(1),
};

module.exports = {
  create,
  update,
};
