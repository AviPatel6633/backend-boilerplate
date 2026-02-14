const express = require("express");
const router = express.Router();

const menuControler = require("./menu.controller");

// menu Routes
router
  .post("/", menuControler.postMenuItem)
  .get("/", menuControler.getAllMenuItems)
  .get("/:taste", menuControler.getMenuItemsByTaste)
  .put("/:id", menuControler.updateDataByid)
  .delete("/:id", menuControler.deleteDataByid);

module.exports = router;
