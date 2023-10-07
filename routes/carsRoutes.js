const express = require("express")
const carsController = require("../controllers/carsController")
const checkId = require("../middlewares/checkId")
const upload = require("../utils/multer")

const router = express.Router()

router
  .route("/api/v1/cars")
  .get(carsController.getApiAllCar)
  .post(upload.single("image"), carsController.createCar)
router
  .route("/api/v1/cars/:id")
  .get(checkId, carsController.getCarById)
  .patch(upload.single("image"), carsController.editCar)
  .delete(carsController.removeCar)
module.exports = router
