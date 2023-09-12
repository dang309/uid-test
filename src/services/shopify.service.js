const axios = require('axios');
const qs = require('qs');
const config = require('../config/config');

const createProduct = async (data) => {
  const res = await axios.post(`${config.shopify.basStoreEndpoint}/products.json`, data, {
    headers: {
      'X-Shopify-Access-Token': config.shopify.appToken,
    },
  });
  console.log({ res });
};

const getProducts = async (params = {}) => {
  const res = await axios.get(`${config.shopify.basStoreEndpoint}/products.json?${qs.stringify(params)}`, {
    headers: {
      'X-Shopify-Access-Token': config.shopify.appToken,
    },
  });

  if (res.status === 200) return res.data.products;

  return [];
};

const fetchProductByUrl = async (url) => {
  if (!url) return;

  const res = await axios.get(`${url}`);

  if (res.status === 200) return res.data.product;

  return [];
};

const countProducts = async (params = {}) => {
  const res = await axios.get(`${config.shopify.basStoreEndpoint}/products/count.json?${qs.stringify(params)}`, {
    headers: {
      'X-Shopify-Access-Token': config.shopify.appToken,
    },
  });

  if (res.status === 200) return res.data.count;

  return [];
};

module.exports = {
  createProduct,
  getProducts,
  fetchProductByUrl,
  countProducts,
};
