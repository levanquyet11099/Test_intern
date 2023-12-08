const express = require('express');
const router = express.Router();
const productController = require('../controllers/productctrl');
const authenticateToken = require('../Middleware/authtoken');

router.use('/', authenticateToken);

router.get('/list',productController.getProductList);
router.post('/searchproduct',productController.getSeacrhProduct);

router.get('/update/:id', productController.geteditProduct);
router.post('/update', productController.updateProduct);

router.get('/add_product', productController.getAddProduct);
router.post('/add_product', productController.addProduct);

router.post('/Delete/:productId', productController.deleteProduct);

module.exports = router;
