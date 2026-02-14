const express = require("express");
const router = express.Router();
const menuRoutes = require('./../modules/menu/menu.routes')
// Import module routes
// const userRoutes = require('../modules/user/user.routes');

// Mount module routes

// router.use('/', menuRoutes);
router.use('/menu', menuRoutes);


// router.use("/", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     message: "API is running 🚀",
//   });
// }); 

module.exports = router;
