const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const schema = mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  productType: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'user',
  },
});

// add plugin that converts mongoose to json
schema.plugin(toJSON);
schema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', schema);

module.exports = Product;
