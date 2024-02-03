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
    https://mongoosejs.com/docs/api/model.html

    kita bisa melakukan sebuah insert data yang mana data nya bisa lebih dari 1, dengan menggunaka method `insertMany()`
    yang ada pada object model
*/

Movie.insertMany(
    [
        {
            "title": "Black Panther",
            "year": 2018,
            "genre": "Action",
            "director": "Ryan Coogler",
            "rating": 7.3,
        },
        {
            "title": "Avengers: Infinity War",
            "year": 2018,
            "genre": "Action",
            "director": "Anthony Russo, Joe Russo",
            "rating": 8.4,
        },
        {
            "title": "Joker",
            "year": 2019,
            "genre": "Crime",
            "director": "Todd Phillips",
            "rating": 8.4,
        },
        {
            "title": "Parasite",
            "year": 2019,
            "genre": "Drama",
            "director": "Bong Joon Ho",
            "rating": 8.6,
        },
        {
            "title": "Spider-Man: Into the Spider-Verse",
            "year": 2018,
            "genre": "Animation",
            "director": "Bob Persichetti, Peter Ramsey, Rodney Rothman",
            "rating": 8.4,
        }
    ]
).then((res) => {
    console.info(res)
    console.info("It work")
}).catch((error) => {
    console.info(error)
})