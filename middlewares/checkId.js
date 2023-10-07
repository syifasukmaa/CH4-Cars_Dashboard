const Car = require("../models/carsModel")
const checkId = (req, res, next, val) => {
  const car = Car.findById(val)

  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: `Can't find the car with id: ${val}`,
    })
  }
  next()
}

module.exports = checkId
