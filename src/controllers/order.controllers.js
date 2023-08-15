const { Orders } = require("../models");

const updateOrder = async (req, res, next) => {
  try {
    const { userId, orderCompleted } = req.body;
    console.log(req.body);

    await Orders.update(
      { completed: orderCompleted },
      { where: { id: userId } }
    );
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateOrder,
};
