const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/movie_db")
    .then(() => {
        console.info("Connected to MongoDB")
    })
    .catch((error) => {
        console.info(error)
    })

/*
    pada mongoose ketika kita ingin berinteraksi dengan document pada database mongodb kita harus menggunakan `models`
    dimana `models` ini memiliki berbagai method untuk melakukan query data

    https://mongoosejs.com/docs/models.html

    untuk melakukan hal hal query kita perlu membuat sebuah construct document nya terlebih dahulu, juga perlu membuat
    schema

    schema adalah sebuah object atau instance untuk mendefinisikan properti data apa saja yang akan disimpan juga tipe
    data yang digunakan itu apa, sehingga nanti method models yang akan digunakan itu mengerti pada saat akan membuat
    sebuah data baru atau dokumen baru atau mengubah dokumen yang sudah ada didalam mongodb itu sesuai dengan
    schema yang digunakan

    jika pada SQL membuat schema ini seperti membuat kolom kolom pada tabel, alasan kenapa kita harus membuat schema/skema
    terlebih dahulu padahal katanya mongodb adalah NoSQL kenapa mongoose harus mendefinisikan schema/skema juga atau 
    pada akhirnya ada `key` dan `value`. Karena mongodb ini sangat bebas sekali data nya bisa menyimpan data dengan
    tipe apapun dan ini tidak cocok dengan paradigma programming apa lagi dengan menggunakan OOP mau tidak mau kita harus
    mengikuti bahasa pemrograman yang menggunakan mongodb nya karena kita menggunakan javascript dan harus mendefinisikan
    object dan membagi masing masing object ini memiliki data yang spesifik jadi kita perlu membuat schema/skema nya

    contoh pembutan schema : https://mongoosejs.com/docs/guide.html#definition

    artinya tidak terlalu bebas antara satu dokumen dengan dokumen lainnya. jadi pada 1 collection jangan sampai berbeda
*/

/*
    membuat schema untuk menyimpan data movie

    jadi schema ini akan menentukan juga tipe data yang akan kita gunakan pada masing masing properti ini agar pada saat
    didalam mongodb nya ketika dikonversi ke biner bisa langsung menentukan data nya akan menyimpan data dengan tipe data
    apa

    tipe data yang bisa kita gunakan :
    - String
    - Number
    - Date
    - Buffer
    - Boolean
    - Mixed
    - ObjectId
    - Array
    - Decimal128
    - Map
    - UUID

    setelah kita membuat sebuah schema baru kita bisa memanfaatkan model
*/
const movieSchema = new mongoose.Schema(
    {
        title: String,
        year: Number,
        score: Number,
        director: String
    }
)

/*
    membuat model Movie, pada argument pertama dari mehtod `model` adalah nama model nya, dan pada argument kedua adalah
    shema dari data nya yang sudah dibuat diatas

    ketika kita sudah membuat schema dan model baru kita bisa membuat sebuah object data yang akan kita simpan kedalam
    mongodb

    maka pada mongodb akan terdapat sebuah collections bernama "movies" ini adalah bentuk jamak dari argument pertama
    pada method "mongoose.model("movie")

    ketika bisa membuat custom nama collections nya dengan mengisikan argument ke 3 dari method "mongoose.model"

    contoh :

    mongoose.model("Movie", movieSchema, "moviekita")

    maka pada mongodb akan memiliki collections "moviekita" alih alih dihasilkan secara otomatis dari method "model"
*/
const Movie = mongoose.model("Movie", movieSchema)

// membuat object data dari model Movie
const movie = new Movie(
    {
        title: "Black Panther",
        year: 2018,
        score: 7.3,
        director: "Ryan Coogler"
    }
)

/*
    ketika kita lihat maka akan ada sebuah `field` baru yaitu `_id` yang memiliki nilai unik sebagai penanda dari id data
    dan data ini juga seperti nya sudah siap untuk kita simpan, jadi secara otomatis akan ditambahkan field `_id` dan
    jadinya data nya sudah siap untuk disimpan ke mongodb bahkan juga merepresentasikan data nya akan seperti ini ketika
    didalam mongodb

    namun data ini belum diinput ke mongodb hanya tersimpan didalam object data `movie` saja, ketika kita ingin menyimpan
    data nya kita bisa menggunakan method `save()` ini adalah salah satu method yang dimiliki oleh model yang berfungsi
    untuk menyimpan data yang sudah kita buat
*/
console.info(movie)

// menyimpan data
movie.save()