const httpStatus = require('http-status');
const moment = require('moment');
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

  await productManager.createMany(productsToInsert);
  const productsToReturns = await productManager.groupByDate(begin, end);

  return res.status(httpStatus.CREATED).send(productsToReturns);
});

const crawlCreate = catchAsync(async (req, res) => {
  const { link } = req.body;
  const product = await shopifyService.fetchProductByUrl(link);

  const productToSave = {
    title: product.title,
    productType: product.product_type,
    createdDate: product.created_at,
    imageUrl: product.image?.src,
  };

  const newProduct = await productManager.create(productToSave);

  const productToSaveForShopify = {
    product: {
      title: product.title,
      body_html: product.body_html,
      vendor: product.vendor,
      product_type: product.product_type,
    },
  };

  await shopifyService.createProduct(productToSaveForShopify);

  return res.status(httpStatus.CREATED).send({
    productId: newProduct.id,
  });
});

module.exports = {
  upsert,
  crawlCreate,
};
