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
    kita bisa menggunakan method "updateOne" untuk mengubah data document dan method ini memerlukan filter

    https://mongoosejs.com/docs/api/model.html#Model.updateOne()

    method ini memiliki 2 argument yang dibutuhkan
    - argument 1 : filter
    - argument 2 : data barusss
*/
Movie.updateOne(
    {
        title: "Parasite"
    },
    {
        rating: 7.0
    }
).then((response) => {
    /*
        kita tidak butuh "then" dan "catch" karena tidak akan mendapatkan data yang telah diubah melainkan hanya akan
        mendapatkan response berhasil atau tidak nya kita update data
    */
   console.info(response)
}).catch((err) => {
    console.info(err)
})

// update many
Movie.updateMany(
    {
        year: {
            $lt: 2019
        }
    },
    {
        rating: 8.0
    }
).then((response) => {
    console.info(response)
}).catch((err) => {
    console.info(err)
})

/*
    update data menggunakan "findByIdAndUpdate", jadi ini akan mencari data nya jika ketemu maka akan diupdate datanya

    https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()

    paramater pertama adalah "id" lalu paramater kedua adalah sebuah "data" baru nya dan paramater ketika adalah "options"
    jika kita ingin menambahkan "options"
*/
Movie.findByIdAndUpdate("65b13eb8b47d30cad31e01e5", {
    rating: 10
}, {
    new: true
}).then((result) => {
    /*
        ketika kita menggunakan "then" dan "catch" pada method ini kita bisa mendapatkan data yang sedang diupdate jika
        berhasil ketemu datanya, atau kita kan mendapatkan data lama nya bukan data baru nya

        https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()

        ketika kita ingin mendapatkan data yang telah diupdate kita perlu menambahkan sebuah "options" yang bernama "new"
        secara default ini bernilai "false" maka tidak akan mendapatkan data baru, namun jika kita ubah manjadi "true"
        maka kita bisa mendapatkan data yang telah diupdate
    */

    console.info(result)
}).catch((err) => {
    console.info(err)
})