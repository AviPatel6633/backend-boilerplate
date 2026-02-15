const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour name is required"],
      unique: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: [true, "Duration is required"], // in days
    },

    maxGroupSize: {
      type: Number,
      required: [true, "Group size is required"],
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "difficult"],
    },

    ratingAverage: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },

    ratingQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    priceDiscount: {
      type: Number,
    },

    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    imageCover: {
      type: String,
      required: true,
    },

    images: [String],

    startDates: [Date],

    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number], // [longitude, latitude]
      address: String,
      description: String,
    },

    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  },
);

const TourItem = mongoose.model("TourItem", tourSchema);
module.exports = TourItem;
