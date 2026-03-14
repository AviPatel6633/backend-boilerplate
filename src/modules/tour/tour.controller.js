const APIFeatures = require("../../utils/apiFeatures");
const TourItem = require("./tour.model");

//Not Working solve Later
const aliasTopTours = (req, res, next) => {
  console.log(req.query);
  // req.query.limit = "3";
  // req.query.sort = "price";
  // req.query.field = "name,duration,ratingAverage,price,summary,description";
  req.query = {
    limit: "3",
    sort: "price",
    fields: "name,duration,ratingAverage,price,summary,description"
  };

  console.log("FULL REQ QUERY:", req.query);
  next();
};

const getTours2 = async (req, res) => {
  try {
    const features = new APIFeatures(TourItem.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
      
    const tourItems = await features.query; 
    res.status(200).json({
      status: "success",
      length: tourItems.length,
      tourItems,
    }); // Send the retrieved items as a response
  } catch (err) {     
    console.error("Error fetching menu items:", err);
    res
      .status(500)
      .json({ status: "success", message: "Internal Server Error" });
  } 
};
// GET API to retrieve all menu items
const getTours = async (req, res) => {
  try {
    // let queryObj = { ...req.query };
    console.log("filter", req.query);
    // ++++++++++++++GET DATA BY QUERY +++++++++++++++
    let queryObj = { ...req.query };

    // 1️⃣ Remove special fields
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2️⃣ Convert query object to string
    let queryStr = JSON.stringify(queryObj);

    // 3️⃣ Replace gte | gt | lte | lt with Mongo operators
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // 4️⃣ Parse back to object
    const filter = JSON.parse(queryStr);

    // 5️⃣ Execute query
    // const tourItems = await TourItem.find(filter);
    let query = TourItem.find(filter);
    // let query = TourItem.find();
    // ++++++++++++++GET DATA BY QUERY +++++++++++++++

    // +========SORT DATA BY API =================
    // /tour?sort=duration // Ascending order quary eg
    // /tour?sort=-duration // decending order quary eg
    if (req.query.sort) {
      console.log(req.query.sort);
      const aplitQuery = req.query.sort.split(",").join(" ");
      console.log(aplitQuery);
      query = query.sort(aplitQuery);
    } else {
      query = query.sort("-updatedAt");
    }
    // +========SORT DATA BY API =================

    // ===========Field Limiting ++++++++++++++++++++
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      console.log(fields);
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    // ===========Field Limiting ++++++++++++++++++++

    // ===========Pagination=======================

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const noOFTours = await TourItem.countDocuments();
      if (skip > noOFTours) throw new Error("This Page does not exists");
    }
    // ===========Pagination=======================

    const tourItems = await query;

    res.status(200).json({
      status: "success",
      length: tourItems.length,
      tourItems,
    }); // Send the retrieved items as a response
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res
      .status(500)
      .json({ status: "success", message: "Internal Server Error" });
  }
};

const getToursByParams = async (req, res) => {
  try {
    let queryObj = { ...req.query };

    // 1️⃣ Remove special fields
    const excludedFields = ["page", "sort", "limit", "field"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2️⃣ Convert query object to string
    let queryStr = JSON.stringify(queryObj);

    // 3️⃣ Replace gte | gt | lte | lt with Mongo operators
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // 4️⃣ Parse back to object
    const filter = JSON.parse(queryStr);
    console.log(filter);
    // 5️⃣ Execute query
    const tourItems = await TourItem.find(filter);

    res.status(200).json({
      status: "success",
      length: tourItems.length,
      tourItems,
    }); // Send the retrieved items as a response
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res
      .status(500)
      .json({ status: "success", message: "Internal Server Error" });
  }
};

// GET API to retrieve all menu items
const getToursById = async (req, res) => {
  try {
    const id = req.params.id;
    const tourItem = await TourItem.findById(id); // Fetch all menu items from the database
    if (!tourItem) {
      return res.status(404).json({
        status: "failed",
        error: "Tour not found",
      });
    }
    res.status(200).json(tourItem); // Send the retrieved items as a response
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res
      .status(500)
      .json({ status: "success", message: "Internal Server Error", err });
  }
};

const createTour = async (req, res) => {
  try {
    const data = req.body;
    const tour = new TourItem(data);
    const response = await tour.save();
    res.status(200).json(response);
  } catch (err) {
    console.log("Error saving menu item:", err);
    res.status(500).json({
      status: "failed",
      message: "Error on Saving Data",
    });
  }
};

module.exports = {
  createTour,
  getTours,
  getTours2,
  getToursById,
  getToursByParams,
  aliasTopTours,
};
