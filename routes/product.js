const express = require('express');
const router = express.Router();
const productController = require('../controllers/productctrl');
const authController = require('../controllers/authController');

router.get('/api/v1/product/list', productController.getProductList);

router.get('/api/v1/product/update/:id', productController.geteditProduct);
router.post('/api/v1/product/update', productController.updateProduct);

router.get('/api/v1/product/add_product', productController.getAddProduct);
router.post('/api/v1/product/add_product', productController.addProduct);

router.post('/api/v1/product/Delete/:productId', productController.deleteProduct);


router.get('/login', authController.getlogin);
router.get('/register', authController.getregister);  

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
