const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/movie_db")
    .then(() => {
        console.info("Connected to MongoDB")
    })
    .catch((error) => {
        console.info(error)
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
    find movie berdasarkan tahun menggunakan operator "$gt" dan "$gte"

    ketika kita menggunakan method "find()" maka yang akan dihasilkan adalah sebuah array object atau mengembalikan sebuah
    array yang berisikan object data, jika ingin mendapatkan sebuah data object saja maka kita menggunakan method
    "findOne()"

    https://mongoosejs.com/docs/api/model.html#Model.findOne()
    https://mongoosejs.com/docs/api/model.html#Model.find()
*/
Movie.findOne(
    {
        year: {
            $gte: 2018
        },
        genre: "Drama"
    }
).then((res) => {
    // kita menggunakan "then" dan "catch" untuk mendapatkan data nya jika berhasil, jika error maka akan masuk ke catch

    // result data
    console.info(res)
}).catch((error) => {
    console.info(error)
})

/*
    ada cara lain selain cara yang digunakan diatas seperti menggunakan method "find" atau "findOne" dan memberikan filter
    seperti diatas

    karena ketika kita membuat sebuah aplikasi dengan express terkadang kita membuat sebuah route seperti ini
    
    app.get("/movies/:id")

    dimana kita kan mencari sebuah data berdasarkan id yang didapatkan dari paramater

    kita bisa menggunakan method "findById" ketika ingin mencari data berdasarkan id
*/

// cara biasa, dimana cukup panjang karena kita perlu memasukan sebuah filter
Movie.findOne(
    {
        _id: "65b13eb8b47d30cad31e01e7"
    }
).then((result) => {
    console.info(result)
}).catch((err) => {
    console.info(err)
})

/*
    cara singkat yang lebih baik, yaitu menggunakan method "findById"

    https://mongoosejs.com/docs/api/model.html#Model.findById()
*/
Movie.findById("65b13eb8b47d30cad31e01e5").then((result) => {
    console.info(result)
}).catch((err) => {
    console.info(err)
})

