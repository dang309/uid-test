const axios = require('axios');
const qs = require('qs');
const config = require('../config/config');

const getProducts = async (params = {}) => {
  const res = await axios.get(`https://uidevify.myshopify.com/admin/api/2023-07/products.json?${qs.stringify(params)}`, {
    headers: {
      'X-Shopify-Access-Token': config.shopify.appToken,
    },
  });

  if (res.status === 200) return res.data.products;

  return [];
};

const countProducts = async (params = {}) => {
  const res = await axios.get(
    `https://uidevify.myshopify.com/admin/api/2023-07/products/count.json?${qs.stringify(params)}`,
    {
      headers: {
        'X-Shopify-Access-Token': config.shopify.appToken,
      },
    }
  );

  if (res.status === 200) return res.data.count;

  return [];
};

module.exports = {
  getProducts,
  countProducts,
};
