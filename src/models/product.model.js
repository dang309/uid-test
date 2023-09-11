const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

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
