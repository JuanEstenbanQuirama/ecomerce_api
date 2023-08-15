const userRoutes = require("./user.routes");
const productsRoutes = require("./products.routes");
const carsRoutes = require("./cars.routes");
const orderRoutes = require("./order.routes");

const apiRoutes = (app) => {
  app.use(userRoutes);
  app.use(productsRoutes);
  app.use(carsRoutes);
  app.use(orderRoutes);

};

module.exports = apiRoutes;
