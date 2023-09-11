import '@shopify/shopify-api/adapters/node';
import config from './config';

const { shopifyApi } = require('@shopify/shopify-api');

const shopify = shopifyApi({
  // The next 4 values are typically read from environment variables for added security
  apiKey: config.shopify.apiToken,
  apiSecretKey: config.shopify.apiSecret,
  scopes: ['read_products'],
  hostName: 'uidevify.myshopify.com',
});

export default shopify;
