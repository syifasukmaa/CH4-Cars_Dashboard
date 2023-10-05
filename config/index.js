const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const database = process.env.DATABASE_URI

    await mongoose.connect(database, {
      useNewUrlParser: true,
    })
    console.log("DB sukses terkoneksi")
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

module.exports = connectDB
