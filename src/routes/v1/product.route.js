const express = require('express');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.post('/upsert', productController.create);
router.post('/crawl-create', productController.create);

module.exports = router;