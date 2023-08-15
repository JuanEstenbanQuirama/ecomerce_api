const { Router } = require("express");
const { getAllProducts, addProductInShop, editProduct } = require("../controllers/products.controllers");

const router = Router();

router.get('/products', getAllProducts); // obtener todos lo productos  min 23 

router.post('/products/addshop', addProductInShop);

router.post('/products/editproduct', editProduct);


module.exports = router;