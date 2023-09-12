const httpStatus = require('http-status');
const moment = require('moment');
const { groupBy, transform } = require('lodash');
const catchAsync = require('../utils/catchAsync');
const { shopifyService } = require('../services');
const { productManager } = require('../managers');
const ApiError = require('../utils/ApiError');

const upsert = catchAsync(async (req, res) => {
  const { begin, end } = req.body;
  const params = {};

  if (begin && end) {
    if (!moment(end).isAfter(moment(begin)))
      throw new ApiError(httpStatus.BAD_REQUEST, 'Start date must be before end date!');
  }

  if (begin) {
    params.created_at_min = moment(new Date(begin)).format('YYYY-MM-DD');
  }
  if (end) {
    params.created_at_max = moment(new Date(end)).format('YYYY-MM-DD');
  }

  const products = await shopifyService.getProducts(params);

  const productsToInsert = products.map((product) => ({
    title: product.title,
    productType: product.product_type,
    createdDate: product.created_at,
    imageUrl: product.image?.src,
  }));

  const newProducts = await productManager.createMany(productsToInsert);
  const productsToReturns = await productManager.groupByDate(begin, end);

  // const productsToReturns = products.reduce((acc, product) => {
  //   const key = moment(product.created_at).format('YYYY-MM-DD');
  //   if (acc[key]) acc[key]++;
  //   else acc[key] = 1;
  //   return acc;
  // }, {});

  return res.status(httpStatus.OK).send(productsToReturns);
});

module.exports = {
  upsert,
};
