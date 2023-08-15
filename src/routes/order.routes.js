const { Router } = require("express");
const { updateOrder } = require("../controllers/order.controllers");

const router = Router();

router.post("/order/completed", updateOrder);

module.exports = router;
