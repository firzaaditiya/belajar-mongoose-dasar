const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ShopApp").then((result) => {
    console.info("Connected to MongoDB")
}).catch((err) => {
    console.info(err)
})

/*
    mongoose virtual property ini adalah sebuah cara dimana seolah olah kita membuat suatu property dimana property itu
    tidak kita buat didalam schema nya, biasanya ini adalah informasi gabungan dari property tertentu atau ketika kita
    ingin mengubah format dari nilai yang ada didalam property yang sudah kita definisikan
*/
const personSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String
    }
)

/*
    membuat sebuah virtual property yang mana tidak akan muncul pada data person, namun bisa diakses data nya

    cara membuatnya kita bisa menggunakan method "virtual" yang ada pada object schema lalu paramater pertama kita
    berikan nama virtual property nya, lalu disini kita membuat sebuah method getter yang akan mengembalikan
    gabungan dari property "firstName" dan "lastName"

    https://mongoosejs.com/docs/tutorials/virtuals.html
*/
personSchema.virtual("fullName").get(function() {
    return `${this.firstName} ${this.lastName}`
})

// membuat model
const Person = mongoose.model("Person", personSchema)

// membuat data person
const person = new Person(
    {
        firstName: "Harry",
        lastName: "Potter"
    }
)

// tidak muncul property "fullName"
console.info(person)

// data dapat diakses
console.info(person.fullName)