const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/movie_db")
    .then((result) => {
        console.info("Connected to MongoDB")
    }).catch((err) => {
        console.info(err)
    })

const movieSchema = new mongoose.Schema(
    {
        title: String,
        year: Number,
        genre: String,
        director: String,
        rating: Number
    }
)

const Movie = mongoose.model("Movie", movieSchema)

/*
    kita bisa menghapus data menggunakan method "deleteOne"

    params 1 : filter
    params 2 : options
*/
Movie.deleteOne(
    {
        title: "Avengers: Infinity War"
    }
).then((result) => {
    // ini akan memunculkan sebuah pesan apakah berhasil atau tidak update nya
    console.info(result)
}).catch((err) => {
    console.info(err)
})

/*
    kita juga bisa menghapus data berdasarkan id

    https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete()
*/
Movie.findByIdAndDelete("65b13eb8b47d30cad31e01e5").then((result) => {
    // ini akan menampilkan data yang dihapus jika ada, jika tidak ketemu maka null
    console.info(result)
    console.info("then")
}).catch((err) => {
    console.info(err)
})