const { Op } = require("sequelize");
const { Cars, ProductsInCar, Orders, ProductsInOrder } = require("../models");

const addProductToCar = async (req, res, next) => {
  try {
    // lo que tenemos que enviar porductid, cantidad y precio
    const carId = req.params.id;
    const { productId, quantity, price } = req.body;

    // veriricar sie l carrido con el id ya exsite con el id del producto que nos envian
    const productInCar = await ProductsInCar.findAll({
      where: {
        [Op.and]: [{ carId }, { productId }],
      },
    });
    if (productInCar.length < 1) {
      await ProductsInCar.create({ carId, productId, quantity, price });
    }

    if (productInCar.length > 0) {
      await ProductsInCar.increment({ quantity }, { where: { carId } });
    }

    // actualizar el total del carrito  por los productos agregados precio * cantidad
    await Cars.increment({ total: quantity * price }, { where: { id: carId } });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const buyProductsInCar = async (req, res, next) => {
  try {

    const { userId, products } = req.body;
    console.log(req.body);
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });

    const order = await Orders.create({ userId, total });

    const productsWithOrder = products.map((product) => ({
      ...product,
      orderId: order.id,
    }));
    await ProductsInOrder.bulkCreate(productsWithOrder);

    // decrement en quantity de cada producto

    res.status(201).json({
      orderId: order.id,
      total: order.total,
      products: productsWithOrder,
    });
  } catch (error) {
    next(error);
  }
};

const getProductsInCarOfUser = async (req, res, next) => {
  try {
    const { carId } =req.params;
    console.log(carId);
    console.log(req.params);
    const productsInCar = await ProductsInCar.findAll({
      where: {carId}
    })
    res.json(productsInCar);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addProductToCar,
  buyProductsInCar,
  getProductsInCarOfUser
};
