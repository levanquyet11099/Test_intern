const Product = require('../models/product');

const getProductList = async (req, res) => {
  try {
    const user = req.session.user;
    const products = await Product.find()
    res.render('product_list', { products, user });

  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};
const geteditProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    
    const product = await Product.findOne({id:productId });
    console.log(product);
    if (!product) {
      console.log(`Không tìm thấy sản phẩm với ID: ${productId}`);
    } else {
      console.log(product);
      res.render('../views/edit_product', { product });
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).send(' Error');
  }
};
const updateProduct = async (req, res) => {
  const { productId, productimage , productName, productPrice, productDescription } = req.body;
  try { 
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        image: productimage,
        name: productName,
        price: productPrice,
        description: productDescription,
      },
      { new: true } // Trả về sản phẩm sau khi cập nhật
    );  
    res.redirect('/api/v1/product/list');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};

const getAddProduct = (req, res) => {
  res.render('../views/add_product',);
};

const addProduct = async (req, res) => {
  const user = req.session.user;
  const { image, name, price, description } = req.body;
  const newProduct = new Product({ image, name, price, description });

  try {
   
    await newProduct.save();
    const products = await Product.find(); 
    res.render('../views/product_list', { products,user });
    //res.redirect('/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};


const deleteProduct = async (req, res) => {
  
  const user = req.session.user;
  const productId = req.params.productId;

  try {
    await Product.findOneAndDelete({id: productId});
    const products = await Product.find(); 
    res.render('../views/product_list',{ products, user});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};
  module.exports = {
    getProductList,
    updateProduct,
    getAddProduct,
    addProduct,
    deleteProduct,
    geteditProduct,
  };
  
