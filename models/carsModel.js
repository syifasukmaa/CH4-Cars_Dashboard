const mongoose = require("mongoose")

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name car required"],
    },
    price: {
      type: Number,
      required: [true, "Name car required"],
    },
    size: {
      type: String,
      required: [true, "Size car required"],
    },
    image: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Car = mongoose.model("Car", carSchema)

module.exports = Car
