const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const create = catchAsync(async (req, res) => {
  const product = await productService.create(req.body);
  res.status(httpStatus.CREATED).send(product);
});

const find = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.find(filter, options);
  res.status(httpStatus.OK).send(result);
});

const findOne = catchAsync(async (req, res) => {
  const product = await productService.findOne(req.params.id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.status(httpStatus.OK).send(product);
});

const update = catchAsync(async (req, res) => {
  const product = await productService.update(req.params.id, req.body);
  res.status(httpStatus.OK).send(product);
});

const remove = catchAsync(async (req, res) => {
  await productService.remove(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create,
  find,
  findOne,
  update,
  remove,
};
