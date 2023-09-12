const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a product
 * @param {Object} body
 * @returns {Promise<Product>}
 */
const create = async (body) => {
  return Product.create(body);
};

/**
 * Create a product
 * @param {Product[]} arr
 * @returns {Promise<Product>}
 */
const createMany = async (arr) => {
  return Product.insertMany(arr);
};

const groupByDate = async (startDate, endDate) => {
  return Product.aggregate([
    {
      $match: {
        createdDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: '$createdDate',
        date: { $first: { $dateToString: { date: '$createdDate', format: '%Y-%m-%d' } } },
        numOfProducts: { $sum: 1 },
        productIds: { $push: '$_id' },
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the result
      },
    },
  ]);
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const find = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const findOne = async (id) => {
  return Product.findById(id);
};

/**
 * Update product by id
 * @param {ObjectId} id
 * @param {Object} body
 * @returns {Promise<Product>}
 */
const update = async (id, body) => {
  const product = await findOne(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  Object.assign(product, body);
  await product.save();

  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const remove = async (id) => {
  const product = await findOne(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  await product.remove();

  return product;
};

module.exports = {
  create,
  createMany,
  groupByDate,
  find,
  findOne,
  update,
  remove,
};
