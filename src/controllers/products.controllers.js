const { Op } = require("sequelize");
const { Products } = require("../models");

const getAllProducts = async (req, res, next) => {
  try {
    // pedir todos los productos del modelo
    const products = await Products.findAll({
      where: {
        availableQty: {
          [Op.gt]: 0,
        },
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const addProductInShop = async (req, res, next) => {
  try {
    const { name, description, price, userId, availableQty, productImage } =
      req.body;
    const product = await Products.create({
      name,
      description,
      price,
      userId,
      availableQty,
      productImage,
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const {id, newDescription} = req.body;
    console.log(req.body)

    await Products.update({description : newDescription }, { where: {id: id}});
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  addProductInShop,
  editProduct,
};


