/*
    untuk menginstall mongoose kita hanya perlu menggunakan perintah `npm i mongoose`

    untuk melakukan koneksi ke mongodb kita hanya perlu makukan ini
*/

// import mongoose
const mongoose = require("mongoose")

/*
    melakukan koneksi kita menggunakan method `connect()` pada argument pertama kita isi dengan url database nya yaitu
    `mongodb://127.0.0.1:27017` lalu diikuti path nama dari database yang akan kita gunakan contoh kita akan menggunakan
    database `movie_db`

    "27017" adalah port default dari mongodb
*/
mongoose.connect("mongodb://127.0.0.1:27017/movie_db")
    .then(() => {
        console.info("Connected to MongoDB")
        console.info(mongoose)
    })
    .catch((error) => {
        console.info(error)
    })