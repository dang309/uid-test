const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,
  },
  shopify: {
    appToken: process.env.SHOPIFY_APP_TOKEN,
    apiToken: process.env.SHOPIFY_API_TOKEN,
    apiSecret: process.env.SHOPIFY_API_SECRET,
    basStoreEndpoint: process.env.SHOPIFY_STORE_BASE_ENDPOINT,
  },
};
