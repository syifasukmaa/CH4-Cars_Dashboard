const express = require("express")
const carsController = require("../controllers/carsAdminController")
const upload = require("../utils/multer")

const router = express.Router()

router.route("/dashboard").get(carsController.getAllCar)

router.route("/dashboard/create").get(carsController.createPage)

router.route("/dashboard/edit/:id").get(carsController.editPage)

router.route("/cars/add").post(upload.single("image"), carsController.createCar)

router
  .route("/cars/update/:id")
  .post(upload.single("image"), carsController.editCar)

router.route("/cars/delete/:id").get(carsController.removeCar)
module.exports = router
