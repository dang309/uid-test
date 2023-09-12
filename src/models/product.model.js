const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  productType: {
    type: String,
  },
  createdDate: {
    type: Date,
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
