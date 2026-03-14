const express = require("express");
const router = express.Router();
const tourController = require("./tour.controller");

router.route("/top-3-tour").get(tourController.aliasTopTours, tourController.getTours)//Not Working
router
.get("/", tourController.getTours2)
.get("/get", tourController.getTours2)
.get("/params", tourController.getToursByParams)
.post("/", tourController.createTour)
.get('/:id', tourController.getToursById )

module.exports = router;