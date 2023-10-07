const { default: mongoose } = require("mongoose")
const Car = require("../models/carsModel")
const cloudinary = require("../lib/cloudinary")
const showFormattedDate = require("../utils/formatDate")

const getAllCar = async (req, res) => {
  try {
    let query = {}
    if (req.query.size) {
      query.size = req.query.size
    }
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" }
    }
    const cars = await Car.find(query)

    res.render("index.ejs", {
      cars,
      query: req.query,
      showFormattedDate,
      message: req.flash("message", ""),
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const createPage = async (req, res) => {
  try {
    await Car.find()
    res.render("create.ejs")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const createCar = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    const carData = {
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      image: result.secure_url,
      imageId: result.public_id,
    }
    await Car.create(carData)
    req.flash("message", "Ditambah")
    res.redirect(200, "/dashboard")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const editPage = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    res.render("edit.ejs", {
      car,
      showFormattedDate,
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

    const imageUrl = await Car.findById(id).select("image")

    if (!file) {
      const carData = {
        name: name,
        price: price,
        size: size,
        image: imageUrl.image,
        imageId: imageId,
      }
      await Car.findByIdAndUpdate(id, carData, {
        new: true,
      })
    } else {
      console.log(imageUrl)
      const result = await cloudinary.uploader.upload(req.file.path)
      const carData = {
        name: name,
        price: price,
        size: size,
        image: result.secure_url,
        imageId: result.public_id,
      }

      await Car.findByIdAndUpdate(id, carData, {
        new: true,
      })
    }

    req.flash("message", "Diupdate")
    res.redirect("/dashboard")
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

    let car = await Car.findById(id)
    await cloudinary.uploader.destroy(car.imageId)

    await Car.findByIdAndRemove(id)
    req.flash("message", "Dihapus")

    res.redirect("/dashboard")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = {
  getAllCar,
  createCar,
  editCar,
  createPage,
  removeCar,
  editPage,
}
