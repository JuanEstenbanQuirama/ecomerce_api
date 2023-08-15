const { Router } = require("express");
const { addProductToCar, buyProductsInCar, getProductsInCarOfUser } = require("../controllers/cars.controllers");


const router = Router();

router.post('/products/car/:id', addProductToCar);  

router.post('/products/order', buyProductsInCar);

router.get('/products/car/:carId', getProductsInCarOfUser);  


module.exports = router;