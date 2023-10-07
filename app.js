// THIRD PARTY PACKAGE/MODULE
const express = require("express")
const morgan = require("morgan")
const flash = require("connect-flash")
const session = require("express-session")

// OUR OWN PACKAGE/MODULE
const adminRouter = require("./routes/carsAdminRoutes")
const carsRouter = require("./routes/carsRoutes")

const app = express()

// middleware dari express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
// biar bisa baca static file
app.use(express.static(`${__dirname}/public`))

//untuk template engine
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

//konfigurasi image

//untuk flash notifikasi
app.use(
  session({
    secret: "geeksforgeeks",
    saveUninitialized: true,
    resave: true,
  })
)

app.use(flash())

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

app.use("/", adminRouter)
app.use("/", carsRouter)

module.exports = app
