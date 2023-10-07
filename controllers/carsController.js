const Car = require("../models/carsModel")
const cloudinary = require("../lib/cloudinary")

const getApiAllCar = async (req, res) => {
  try {
    let query = {}
    if (req.query.size) {
      query.size = req.query.size
    }
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" }
    }
    const cars = await Car.find(query)

    res.status(200).json({
      status: "success",
      message: "Success Get All Cars",
      length: cars.length,
      data: { cars },
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed Get All Cars",
    })
  }
}
const getCarById = async (req, res, next) => {
  const id = req.params.id
  try {
    const car = await Car.findById(id)

    res.status(200).json({
      status: "success",
      message: "Success Get Car Detail",
      data: car,
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Failed Get Car by id ${id}`,
    })
  }
}

const createCar = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    const { name, price, size } = req.body
    const carData = {
      name,
      price,
      size,
      image: result.secure_url,
      imageId: result.public_id,
    }
    const car = await Car.create(carData)
    res.status(200).json({
      status: "success",
      message: "Success create new car",
      data: { car },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const editCar = async (req, res) => {
  try {
    const id = req.params.id
    const { name, price, size, imageId } = req.body
    const file = req?.file

    const imageUrl = await Car.findById(id).select("image").select("imageId")

    const carData = !file
      ? {
          name,
          price,
          size,
          image: imageUrl.image,
          imageId: imageId,
        }
      : {
          name,
          price,
          size,
          image: (await cloudinary.uploader.upload(req.file.path)).secure_url,
          imageId: (await cloudinary.uploader.upload(req.file.path)).public_id,
        }

    const car = await Car.findByIdAndUpdate(id, carData, {
      new: true,
    })
    res.status(200).json({
      status: "success",
      message: "Success update car",
      data: { car },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const removeCar = async (req, res) => {
  try {
    const id = req.params.id

    let carId = await Car.findById(id)
    await cloudinary.uploader.destroy(carId.imageId)

    const car = await Car.findByIdAndRemove(id)

    res.status(200).json({
      status: "success",
      message: "Success delete car",
      data: null,
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = { getApiAllCar, getCarById, createCar, editCar, removeCar }
