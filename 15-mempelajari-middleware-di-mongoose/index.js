const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Person").then((result) => {
    console.info("Connected to MongoDB")
}).catch((err) => {
    console.info(err)
})

/*
    https://mongoosejs.com/docs/middleware.html

    middleware didalam mongoose adalah sebuah method yang akan dijalankan/bekerja sebelum (pre) atau setelah (post)
    suatu method yang kita jalankan dan cara memicu/trigger middleware ini ketika kita menjalankan beberapa method

    salah satu nya dari dokumentasi nya :
    - count
    - countDocuments
    - deleteMany
    - deleteOne
    - estimatedDocumentCount
    - find
    - findOne
    - findOneAndDelete
    - findOneAndReplace
    - findOneAndUpdate
    - remove
    - replaceOne
    - update
    - updateOne
    - updateMany
    - validate
*/

const personSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String
    }
)

// porses "pre" ketika melakukan atau menjalankan method "save()"
// personSchema.pre("save", function(next) {
    /*
        pada kita bisa tambahkan "next" pada anonymous function kita

        https://mongoosejs.com/docs/middleware.html#pre
    */
// })

personSchema.pre("save", async function() {
    // override data
    this.firstName = "Luna"
    this.lastName = "Lovegood"
    console.info("Persiapan menyimpan data")
})

personSchema.post("save", async function() {
    console.info("Data berhasil disimpan")
})

/*
    proses "pre" dan "post" ini sebuah middleware yang disediakan oleh mongoose untuk melakukan proses tertentu sebelum
    ataupun sesudah melakukan aksi
*/

personSchema.virtual("fullName").get(function() {
    return `${this.firstName} ${this.lastName}`
})

// membuat model
const Person = mongoose.model("Person", personSchema)

// membuat data person
const person = new Person(
    {
        firstName: "Ron",
        lastName: "Weasly"
    }
)

// melihat data object
console.info(person)

person.save().then((result) => {
    // menampilkan data yang disimpan
    console.info(result)
}).catch((err) => {
    console.info(err)
})